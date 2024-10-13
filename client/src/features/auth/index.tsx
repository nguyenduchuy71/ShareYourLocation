import { useState, useEffect } from "react";
import { IAuthenStore } from "@/features/auth/epic/interface";
import { useAuthStore } from "@/features/auth/epic";
import CustomLayout from "@/components/custom/CustomLayout";
import { useToast } from "@/components/ui/use-toast";
import Login from "@/components/Login";

function LoginScreen() {
  const [authInfo, loginEpic, signUpEpic] = useAuthStore(
    (state: IAuthenStore) => [
      state.authInfo,
      state.loginEpic,
      state.signUpEpic,
    ],
  );
  useEffect(() => {
    if (authInfo) {
      window.location.href = "/";
    }
  }, []);
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    if (isLogin) {
      loginEpic({
        email,
        password,
      });
    } else {
      if (confirmPassword === password) {
        signUpEpic({
          email,
          password,
        });
      } else {
        toast({
          title: "Error",
          description: "Pasword not match",
        });
      }
    }
  };
  return (
    <CustomLayout>
      <Login
        setConfirmPassword={setConfirmPassword}
        setEmail={setEmail}
        setIsLogin={setIsLogin}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </CustomLayout>
  );
}

export default LoginScreen;
