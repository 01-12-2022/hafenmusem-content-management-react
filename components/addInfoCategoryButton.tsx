'use client'

import { Item } from "@/app/db/dbTypes"
import { insertInfoCategory } from "@/app/db/extraInfos_db"
import { getItemNameFromNameKey } from "@/lib/utils"
import usePopup from "./popups/PopupModal"
import { Button } from "./ui/button"

type AddInfoCategoryButtonProps = {
    item: Item
    locale: string
}
export default function AddInfoCategoryButton({ item, locale }: AddInfoCategoryButtonProps) {
    const doAfterTextCreate = (elementName: string) => {
        // insertItemIntoDb(elementName)
        const typeName = `infotype_${elementName}`
        const valueName = `extrainfo_${getItemNameFromNameKey(item)}_${elementName}`
        insertInfoCategory(typeName, valueName, item.id)
    }

    const popup = usePopup({
        context: 'Add Info Category',
        fieldName: 'Category Name',
        locale,
        stringKey: 'infotype_$',
        variant: {
            variant: 'create',
            placeholderSymbol: '$',
            doAfterTextCreate
        }
    })

    return (<>
        <Button onClick={() => popup.setVisible(true)} className='mb-2'>
            Add Info Category
        </Button>
        {popup.component}
    </>)
}