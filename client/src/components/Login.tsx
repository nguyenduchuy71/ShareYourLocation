import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomInput from "@/components/custom/CustomInput";

function Login({
  setIsLogin,
  setEmail,
  setPassword,
  setConfirmPassword,
  handleLogin,
}) {
  return (
    <div className="flex justify-center items-center mt-10">
      <Tabs
        defaultValue="signin"
        className="w-[400px] p-4 border-2 border-slate-600 rounded-lg"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin" onClick={() => setIsLogin(true)}>
            Sign In
          </TabsTrigger>
          <TabsTrigger value="signup" onClick={() => setIsLogin(false)}>
            Sign Up
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="signin"
          className="border border-slate-500 rounded-lg"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Welcome back!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <CustomInput
                  type="text"
                  id="email"
                  setValue={setEmail}
                  defaultValue="Email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <CustomInput
                  type="password"
                  id="password"
                  setValue={setPassword}
                  defaultValue="Password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={handleLogin}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent
          value="signup"
          className="border border-slate-500 rounded-lg"
        >
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create new account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="newEmail">Email</Label>
                <CustomInput
                  type="text"
                  id="newEmail"
                  setValue={setEmail}
                  defaultValue="Email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newPassword">Password</Label>
                <CustomInput
                  type="password"
                  id="newPassword"
                  setValue={setPassword}
                  defaultValue="Password"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <CustomInput
                  type="password"
                  id="confirmPassword"
                  setValue={setConfirmPassword}
                  defaultValue="Password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={handleLogin}>Register</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
