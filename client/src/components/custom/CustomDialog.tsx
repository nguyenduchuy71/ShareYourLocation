import { useState } from "react"
import { Button } from "@/components/ui/button"
import CustomForm from "@/components/custom/CustomForm"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function CustomDialog({ actions, title }) {
    const [openDialog, setOpenDialog] = useState(false)
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpenDialog(true)}>{title}</Button>
            </DialogTrigger>
            <DialogContent className="w-[400px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <CustomForm actions={actions} setOpenDialog={setOpenDialog} />
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog