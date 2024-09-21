import CustomDialog from "./custom/CustomDialog"
import { createProjectFormSchema } from "./custom/validate/projectSchema"
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { Label } from "./ui/label"

function Project({ project, deleteProject, joinProject }) {
    return (
        <Card className="w-[350px] boder-1 border-slate-400">
            <CardHeader>
                <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">{project.description}</Label>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <CustomDialog
                    actions={joinProject}
                    title="Join project"
                    formSchema={createProjectFormSchema}
                    objectData={
                        {
                            projectId: {
                                label: "Project Id",
                                defaultValues: project.id,
                                placeholder: "Id",
                                type: "text",
                                enabled: false,
                            },
                            projectName: {
                                label: "Project name",
                                defaultValues: project.name,
                                placeholder: "Name",
                                type: "text",
                                enabled: false,
                            },
                            projectDescription: {
                                label: "Project description",
                                defaultValues: project.description,
                                placeholder: "Description",
                                type: "text",
                                enabled: false,
                            },
                            projectCode: {
                                label: "Project code",
                                defaultValues: "",
                                placeholder: "******",
                                type: "password",
                                enabled: true,
                            },
                        }
                    }
                    type="Join" />
                <Button variant="destructive" onClick={() => deleteProject(project.id)}>Remove</Button>
            </CardFooter>
        </Card>
    )
}

export default Project