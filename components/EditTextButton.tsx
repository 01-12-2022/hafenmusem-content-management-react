'use client'
import {TranslationProps} from "@/components/TranslatedText";
import {EditIcon, PlusIcon} from "lucide-react";
import {EditButtonTypes as ButtonTypes} from "@/app/constants";
import usePopup from "@/components/PopupModal";

type EditTextButtonProps = {
    fieldName: string,
    context: string,
    locale: string,
    stringKey: string,
    variant: ButtonTypes
    value: string
}

export function EditTextButton({
                                   variant,
                                   fieldName,
                                   value,
                                   context,
                                   locale,
                                   stringKey
                               }: EditTextButtonProps) {
    const popupModal = usePopup({
        locale,
        stringKey,
        variant: variant === ButtonTypes.add ? "insert" : "update",
        fieldName,
        oldValue: value,
        context
    })

    const showModal = () => popupModal?.setVisible(true)

    return <button onClick={showModal}>

        {variant === ButtonTypes.edit
            ? <EditIcon/>
            : <PlusIcon/>}

        {popupModal?.component}
    </button>
}