'use client'
import React, {CSSProperties, useState} from "react";
import {Card} from "@/components/ui/card";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {TranslationProps} from "@/components/TranslatedText";
import {insertTranslationFromForm, updateTranslationFromForm} from "@/app/actions";
import {revalidatePath} from "next/cache";

type ModalProps = TranslationProps & {
    variant: "insert" | "update"
    context: string
    fieldName: string
    oldValue?: string
}
export default function usePopup({context, variant, oldValue, fieldName, locale, stringKey}: ModalProps) {
    const [isVisible, setVisible] = useState(false)
    const [newValue, setNewValue] = useState<string>(oldValue || "")

    type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>
    const hideModal = (e: ClickEvent | undefined) => {
        e?.stopPropagation()
        setVisible(false)
    }

    async function onSubmit(data: FormData) {
        const updateFunction = (variant === "insert") ? insertTranslationFromForm : updateTranslationFromForm

        await updateFunction(locale, stringKey, data)
        hideModal(undefined)
    }

    const component =
        !isVisible
            ? null
            : (<>
                    <div style={styles.modalContainer} onClick={hideModal}/>
                    <Card style={styles.modal}>
                        <form action={onSubmit}>
                            <div style={styles.closeIconContainer} onClick={hideModal}>
                                <CloseIcon/>
                            </div>
                            <div style={styles.modalContent}>
                                <h3>{context}</h3>
                                {variant === "insert" ?
                                    <>
                                        <h2>Value for {fieldName}:</h2>
                                        <textarea style={styles.textarea} name='newValue' value={newValue}
                                                  onChange={e => setNewValue(e.currentTarget.value)}/>
                                    </> : null
                                }
                                {variant === "update" ?
                                    <>
                                        <h2>Old value for {fieldName}:</h2>
                                        <textarea style={styles.textarea} disabled={true} contentEditable={false}
                                                  value={oldValue}/>
                                        <div style={styles.spacer}/>
                                        <h2>New value for {fieldName}:</h2>
                                        <textarea style={styles.textarea} name="newValue" value={newValue}
                                                  onChange={e => setNewValue(e.currentTarget.value)}/>
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
        component
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