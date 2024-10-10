'use client'
import React, {CSSProperties, useState} from "react";
import {Card} from "@/components/ui/card";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {TranslationProps} from "@/components/TranslatedText";
import {updateTranslation, insertTranslation} from '@/app/actions'

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

    const onSubmit = () => {
        hideModal(undefined)
    }

    const component =
        !isVisible
            ? null
            : (<>
                    <div style={styles.modalContainer} onClick={hideModal}/>
                    <Card style={styles.modal}>
                        <div style={styles.closeIconContainer} onClick={hideModal}>
                            <CloseIcon/>
                        </div>
                        <div style={styles.modalContent}>
                            <h3>{context}</h3>
                            {variant === "insert" ?
                                <>
                                    <h2>Value for {fieldName}:</h2>
                                    <input value={newValue} onChange={e => setNewValue(e.currentTarget.value)}/>
                                </> : null
                            }
                            {variant === "update" ?
                                <>
                                    <h2>Old value for {fieldName}:</h2>
                                    <input contentEditable={false} value={oldValue}/>
                                    <div style={{height: 10}}/>
                                    <h2>New value for {fieldName}:</h2>
                                    <input value={newValue} onChange={e => setNewValue(e.currentTarget.value)}/>
                                </> : null

                            }
                            {variant === "insert"
                                ? <button formAction={() => insertTranslation(locale, stringKey, newValue)}
                                          onClick={onSubmit}>Save</button>
                                : <button formAction={() => updateTranslation(locale, stringKey, newValue)}
                                          onClick={onSubmit}>Save</button>
                            }
                        </div>
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
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    } as CSSProperties
}