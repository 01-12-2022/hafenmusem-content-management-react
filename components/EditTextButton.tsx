'use client'
import {TranslationProps} from "@/components/TranslatedText";
import {EditIcon, PlusIcon} from "lucide-react";
import {EditButtonTypes as ButtonTypes} from "@/app/constants";
import PopupModal from "@/components/PopupModal";
import {useState} from "react";

type EditTextButtonProps = TranslationProps & {
    variant: ButtonTypes
}
export default function EditTextButton({locale, stringKey, variant}: EditTextButtonProps) {
    const [modalOpen, setModalOpen] = useState(false);

    if (variant == ButtonTypes.add)
        return (<button onClick={() => setModalOpen(true)}>
            <PlusIcon/>
            <PopupModal isVisible={modalOpen} hideModal={()=>setModalOpen(false)}>
                <h1>Add Modal!!</h1>
                <p>Content</p>
            </PopupModal>
        </button>)

    return <button onClick={() => setModalOpen(true)}>
        <EditIcon/>
        <PopupModal isVisible={modalOpen} hideModal={()=>setModalOpen(false)}>
            <h1>Edit Modal!!</h1>
            <p>Edit content etc</p>
        </PopupModal>
    </button>
}