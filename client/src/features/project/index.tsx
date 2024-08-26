import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CustomForm from "@/components/custom/CustomForm"
import Project from "@/components/Project"
import Pages from "@/components/Pages"
import CustomLayout from "@/components/custom/CustomLayout"

function ProjectScreen() {
    return (
        <CustomLayout>
            <div className="relative">
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
                <div className="flex flex-col">
                    <div className="min-h-screen mb-4">
                        <Project />
                    </div>
                    <Pages />
                </div>
            </div>
        </CustomLayout>
    )
}

export default ProjectScreen