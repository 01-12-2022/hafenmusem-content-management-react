'use client'

import { Card } from "@/components/ui/card";
import React, { CSSProperties, useState } from "react";
import { Button } from "../ui/button";

type ModalProps = {
    text: string,
    onConfirm: () => void | Promise<void>
}
export default function useDeleteItemPopup({ text, onConfirm }: ModalProps) {
    const [isVisible, setVisible] = useState(false)

    type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>
    const hideModal = (e: ClickEvent | undefined) => {
        e?.stopPropagation()
        setVisible(false)
    }

    async function onSubmit() {
        await onConfirm()
        // router.replace('/items')
        hideModal(undefined)
    }

    const component =
        !isVisible
            ? null
            : (<>
                <div style={styles.modalContainer} onClick={hideModal} />
                <Card style={styles.modal}>
                    <form action={onSubmit} className='flex flex-col gap-3 p-4'>
                        <div>{text}</div>
                        <div className='flex flex-row items-end self-end gap-1'>
                            <Button type='submit' onClick={onSubmit}>OK</Button>
                            <Button variant='destructive' onClick={hideModal}>Cancel</Button>
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