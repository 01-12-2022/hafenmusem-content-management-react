import {CSSProperties, ReactNode} from "react";
import {Card} from "@/components/ui/card";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

type ModalProps = {
    isVisible: boolean
    hideModal: ()=>void
    children: ReactNode[]
}
export default function PopupModal({isVisible, hideModal, children}: ModalProps) {
    if (!isVisible)
        return null

    return (
        <div style={styles.modalContainer} onClick={hideModal}>
            <Card style={styles.modal}>
                <div style={styles.closeIconContainer} onClick={hideModal}>
                    <CloseIcon/>
                </div>
                <div style={styles.modalContent}>
                    {children}
                </div>
            </Card>
        </div>
    )
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