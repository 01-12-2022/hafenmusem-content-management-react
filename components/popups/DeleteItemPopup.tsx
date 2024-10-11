'use client'
import { Card } from "@/components/ui/card";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import React, { CSSProperties, useState } from "react";
import { Button } from "../ui/button";

type ModalProps = {
    text: string,
    onConfirm: () => void
}
export default function useDeleteItemPopup({ text, onConfirm }: ModalProps) {
    const [isVisible, setVisible] = useState(false)
    const [submittedValue, setSubmittedValue] = useState<string>()

    type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>
    const hideModal = (e: ClickEvent | undefined) => {
        e?.stopPropagation()
        setVisible(false)
    }

    const component =
        !isVisible
            ? null
            : (<>
                <div style={styles.modalContainer} onClick={hideModal} />
                <Card style={styles.modal}>
                    <div>{text}</div>
                    <div className='flex flex-row items-end'>
                        <Button>OK</Button>
                        <Button variant='destructive'>Cancel</Button>
                    </div>
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