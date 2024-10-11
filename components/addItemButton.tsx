'use client'
import { useEffect } from "react"
import usePopup from "./popups/PopupModal"
import { Button } from "./ui/button"
import { insertItemIntoDb } from "@/app/db/items_db"

type AddItemButtonProps = {
    locale: string
}
export default function AddItemButton({ locale }: AddItemButtonProps) {
    const doAfterTextCreate = (elementName: string) => {
        insertItemIntoDb(elementName)
        console.log("inserted item: ", elementName, "with key: ", `item_${elementName}_name`)
    }

    const popup = usePopup({
        context: 'Add Item',
        fieldName: 'Item Name',
        locale,
        stringKey: 'item_$_name',
        variant: {
            variant: 'create',
            placeholderSymbol: '$',
            doAfterTextCreate
        }
    })

    useEffect(() => {
        console.log("submitted value: ", popup.submittedValue)
    }, [popup.submittedValue])

    return (<>
        <Button onClick={() => popup.setVisible(true)}>
            Add Item
        </Button>
        {popup.component}
    </>)
}