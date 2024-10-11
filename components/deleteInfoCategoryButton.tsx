'use client'

import { deleteInfoCategory } from "@/app/db/extraInfos_db";
import { Trash2 } from "lucide-react";
import { InfoCategory } from "./cards/infoCategoryCard";
import useDeleteItemPopup from "./popups/DeleteItemPopup";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function DeleteInfoCategoryButton({ category, itemId }: { category: InfoCategory, itemId: number }) {
    const deleteItem = deleteInfoCategory.bind(null, category, itemId)

    const popup = useDeleteItemPopup({
        text: 'Are you sure you want to delete this info category?',
        onConfirm: deleteItem
    })

    return (
        <Button type="submit" onClick={() => popup.setVisible(true)} variant='destructive' className="mb-2">
            <Trash2 style={{ color: 'white' }} />
            {popup.component}
        </Button>)
}