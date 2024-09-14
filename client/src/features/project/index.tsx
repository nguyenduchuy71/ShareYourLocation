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
import { IProjectStore } from "@/features/project/epic/interface";
import { useProjectStore } from "@/features/project/epic";
import { useEffect } from "react"

function ProjectScreen() {
    const [projects, createProjectEpic, getAllProjectEpic] = useProjectStore((state: IProjectStore) => [
        state.projects,
        state.createProjectEpic,
        state.getAllProjectEpic
    ]);
    useEffect(() => {
        getAllProjectEpic()
    }, [getAllProjectEpic])
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
                            <CustomForm actions={createProjectEpic} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="min-h-screen my-14">
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {
                            projects.map((project, key) => <div className="" key={key}>
                                <Project project={project} />
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <Pages />
        </CustomLayout>
    )
}

export default ProjectScreen