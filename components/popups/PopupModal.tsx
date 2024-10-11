'use client'
import { insertTranslationFromForm, updateTranslationFromForm } from "@/app/actions";
import { Card } from "@/components/ui/card";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import React, { CSSProperties, useEffect, useState } from "react";

type ModalProps = {
    locale: string,
    stringKey: string,
    variant: "insert" | "update" | { variant: 'create', placeholderSymbol: string, doAfterTextCreate: (elementName: string) => void }
    context: string
    fieldName: string
    oldValue?: string
}
export default function usePopup({ context, variant, oldValue, fieldName, locale, stringKey }: ModalProps) {
    const [isVisible, setVisible] = useState(false)
    const [newValue, setNewValue] = useState<string>(oldValue || "")
    const [submittedValue, setSubmittedValue] = useState<string>()

    useEffect(() => {
        if (isVisible) setSubmittedValue(undefined)
    }, [isVisible])

    type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>
    const hideModal = (e: ClickEvent | undefined) => {
        e?.stopPropagation()
        setVisible(false)
    }

    function escapeStringForSQL(input: string) {
        const str = input.toLowerCase().trim()
        return str
            .replace(/ /g, '_') //Escape spaces
            .replace(/\\/g, '\\\\')  // Escape backslashes
            .replace(/'/g, "\\'")    // Escape single quotes
            .replace(/"/g, '\\"')    // Escape double quotes
            .replace(/\0/g, '\\0')   // Escape null characters
            .replace(/\n/g, '\\n')   // Escape newlines
            .replace(/\r/g, '\\r')   // Escape carriage returns
            .replace(/\x1a/g, '\\Z'); // Escape the EOF character
    }

    async function onSubmit(data: FormData) {
        const newValue = escapeStringForSQL(data.get('newValue')!!.toString());
        setSubmittedValue(newValue);

        const updateFunction = (variant === "update") ? updateTranslationFromForm : insertTranslationFromForm;

        if (variant !== 'insert' && variant !== 'update') {
            const sanitizedStringKey = stringKey.replace(variant.placeholderSymbol, newValue);
            await updateFunction(locale, sanitizedStringKey, data);
            variant.doAfterTextCreate(newValue)
        } else {
            await updateFunction(locale, stringKey, data);
        }

        hideModal(undefined);
    }

    const component =
        !isVisible
            ? null
            : (<>
                <div style={styles.modalContainer} onClick={hideModal} />
                <Card style={styles.modal}>
                    <form action={onSubmit}>
                        <div style={styles.closeIconContainer} onClick={hideModal}>
                            <CloseIcon />
                        </div>
                        <div style={styles.modalContent}>
                            <h3 className='text-center flex-grow font-semibold'>{context}</h3>
                            {variant === "insert" || variant !== 'update' ?
                                <>
                                    <h2>Value for {fieldName}:</h2>
                                    <textarea style={styles.textarea} name='newValue' value={newValue}
                                        onChange={e => setNewValue(e.currentTarget.value)} />
                                </> : null
                            }
                            {variant === "update" ?
                                <>
                                    <h2>Old value for {fieldName}:</h2>
                                    <textarea style={styles.textarea} disabled={true} contentEditable={false}
                                        value={oldValue} />
                                    <div style={styles.spacer} />
                                    <h2>New value for {fieldName}:</h2>
                                    <textarea style={styles.textarea} name="newValue" value={newValue}
                                        onChange={e => setNewValue(e.currentTarget.value)} />
                                </> : null

                            }
                            <button type={'submit'}>Save</button>
                        </div>
                    </form>
                </Card>
            </>
            )

    return {
        isVisible,
        setVisible,
        component,
        submittedValue
    }
}

const styles = {
    modalContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
    } as CSSProperties,
    modal: {
        cursor: 'default',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 12,
        padding: 8,
        alignSelf: 'center',
        justifyContent: 'center',
    } as CSSProperties,
    closeIconContainer: {
        color: 'red',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    } as CSSProperties,
    spacer: {
        height: 20
    } as CSSProperties,
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 15,
        width: 600,
        maxHeight: 800,
    } as CSSProperties,
    textarea: {
        height: 300,//'auto',
        maxHeight: 100,
        margin: 5
    } as CSSProperties
}