import React from 'react'
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

function CustomForm({ actions, setOpenDialog, formSchema, objectData, type }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...Object.keys(objectData).map(key => {
                return { [key]: objectData[key].defaultValues }
            })
        }
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        actions({ ...values })
        setOpenDialog(false)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8">
                {
                    Object.keys(objectData).map(key => {
                        return <FormField
                            key={key}
                            control={form.control}
                            name={key}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{objectData[key].label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={objectData[key].placeholder}
                                            type={objectData[key].type}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    })
                }
                <div className="float-right">
                    <Button type="submit">{type}</Button>
                </div>
            </form>
        </Form>
    )
}

export default React.memo(CustomForm)