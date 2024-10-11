// 'use client'

import { Item } from "@/app/db/dbTypes";
import { deleteItemFromDb } from "@/app/db/items_db";
import { Trash2 } from "lucide-react";
import useDeleteItemPopup from "./popups/DeleteItemPopup";
import { Button } from "./ui/button";

export default async function DeleteItemButton({ item }: { item: Item }) {
    const deleteItem = deleteItemFromDb.bind(null, item.id)

    const popup = useDeleteItemPopup({
        text: 'Are you sure you want to delete this item?',
        onConfirm: deleteItem
    })

    return (
        <Button type="submit" onClick={() => popup.setVisible(true)} variant='destructive' className="relative right-2 top-2">
            <Trash2 style={{ color: 'white' }} />
            {popup.component}
        </Button>)
}
