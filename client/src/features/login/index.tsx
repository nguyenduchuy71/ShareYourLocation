import { useState, useEffect } from "react";
import { IAuthenStore } from "@/features/login/epic/interface";
import { useAuthStore } from "@/features/login/epic";
import CustomLayout from "@/components/CustomLayout"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

function LoginScreen() {
    const [authToken, loginEpic, signUpEpic] = useAuthStore((state: IAuthenStore) => [
        state.authToken,
        state.loginEpic,
        state.signUpEpic,
    ]);
    useEffect(() => {
        if (authToken) {
            window.location.href = "/";
        }
        return () => {
        };
    }, [authToken]);
    const { toast } = useToast()
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        if (isLogin) {
            await loginEpic({
                email,
                password,
            });
        } else {
            if (confirmPassword === password) {
                await signUpEpic({
                    email,
                    password,
                });
            }
            else {
                toast({
                    title: "Error",
                    description: "Pasword not match",
                })
            }
        }
    };
    return (
        <CustomLayout>
            <div className="flex justify-center items-center mt-10">
                <Tabs defaultValue="signin" className="w-[400px] p-4 border-2 border-slate-600 rounded-lg">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin" onClick={() => setIsLogin(true)}>Sign In</TabsTrigger>
                        <TabsTrigger value="signup" onClick={() => setIsLogin(false)}>Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin" className="border border-slate-500 rounded-lg">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle>Sign In</CardTitle>
                                <CardDescription>
                                    Welcome back!
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input onChange={(e) => setPassword(e.target.value)} id="password" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <Button onClick={handleLogin}>Login</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="signup" className="border border-slate-500 rounded-lg">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle>Sign Up</CardTitle>
                                <CardDescription>
                                    Create new account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="newEmail">Email</Label>
                                    <Input onChange={(e) => setEmail(e.target.value)} id="newEmail" placeholder="Email" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="newPassword">Password</Label>
                                    <Input onChange={(e) => setPassword(e.target.value)} id="newPassword" type="password" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="confirmPassword">Confirm password</Label>
                                    <Input onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" type="password" />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <Button onClick={handleLogin}>Register</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </CustomLayout>
    )
}

export default LoginScreen