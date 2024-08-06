import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CustomForm from "@/components/CustomForm"
import Project from "@/components/Project"

function HomeScreen() {
    return (
        <div className="p-4 min-h-screen">
            <div className="relative">
                <Project />
                <div className="absolute top-0 right-0">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Create project</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[400px]">
                            <DialogHeader>
                                <DialogTitle>Create project</DialogTitle>
                            </DialogHeader>
                            <CustomForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen