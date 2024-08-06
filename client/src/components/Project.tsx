import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { Label } from "./ui/label"

function Project() {
    return (
        <Card className="w-[350px] boder-1 border-slate-400">
            <CardHeader>
                <CardTitle>Project</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Project description</Label>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Join</Button>
                <Button variant="destructive">Remove</Button>
            </CardFooter>
        </Card>
    )
}

export default Project