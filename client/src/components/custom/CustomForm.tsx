import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const formSchema = z.object({
    projectName: z.string().min(2, {
        message: "Project name must be at least 2 characters.",
    }),
    projectDescription: z.string().min(4, {
        message: "Project description must be at least 4 characters.",
    }),
    projectCode: z.string().min(4, {
        message: "Project code must be at least 4 characters.",
    }),
})

function CustomForm({ actions, setOpenDialog }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            projectDescription: "",
            projectCode: "",
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        actions({
            name: values.projectName,
            description: values.projectDescription,
            code: values.projectCode
        })
        setOpenDialog(false)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project name</FormLabel>
                            <FormControl>
                                <Input placeholder="Project name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project description</FormLabel>
                            <FormControl>
                                <Input placeholder="Project description" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="projectCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project code</FormLabel>
                            <FormControl>
                                <Input placeholder="Project code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Create</Button>
            </form>
        </Form>
    )
}

export default CustomForm