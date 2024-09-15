import { useEffect } from "react"
import Project from "@/components/Project"
import Pages from "@/components/Pages"
import CustomLayout from "@/components/custom/CustomLayout"
import { IProjectStore } from "@/features/project/epic/interface";
import { useProjectStore } from "@/features/project/epic";
import CustomDialog from "@/components/custom/CustomDialog"

function ProjectScreen() {
    const [projects, createProjectEpic, getAllProjectEpic, deleteProjectEpic] = useProjectStore((state: IProjectStore) => [
        state.projects,
        state.createProjectEpic,
        state.getAllProjectEpic,
        state.deleteProjectEpic
    ]);
    useEffect(() => {
        getAllProjectEpic()
    }, [getAllProjectEpic])
    return (
        <CustomLayout>
            <div className="relative">
                <div className="absolute top-0 right-0">
                    <CustomDialog actions={createProjectEpic} title="Create project" />
                </div>
            </div>
            <div className="min-h-screen my-14">
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {
                            projects.map((project, key) => <div className="" key={key}>
                                <Project project={project} deleteProject={deleteProjectEpic} />
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