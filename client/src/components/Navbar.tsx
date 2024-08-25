import { useEffect } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MapPinIcon, Bars3Icon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import CustomRoute from "./CustomRoute";
import { IAuthenStore } from "@/features/auth/epic/interface";
import { useAuthStore } from "@/features/auth/epic";

function NavBar() {
    const [authInfo, logoutEpic, getAuthenUserInfo] = useAuthStore((state: IAuthenStore) => [
        state.authInfo,
        state.logoutEpic,
        state.getAuthenUserInfo
    ]);
    useEffect(() => {
        getAuthenUserInfo()
    }, [])
    return (
        <header className="sticky top-0 z-40 bg-slate-400 px-2 md:px-4">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center" >
                    <MapPinIcon className="size-8" />
                </Link>
                <nav className="hidden items-center gap-4 md:flex">
                    <CustomRoute route="/projects" name="Projects" />
                </nav>
                <div className="hidden items-center gap-4 md:flex">
                    <CustomRoute route='/login' name={authInfo ? 'Logout' : 'Login'} logoutAction={logoutEpic} isLogout={authInfo && true} />
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <Bars3Icon className="size-8" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full max-w-xs">
                        <div className="flex h-16 items-center justify-between px-4">
                            <Link to="/" className="flex items-center" >
                                <MapPinIcon className="size-10" />
                            </Link>
                        </div>
                        <div className="grid gap-4 p-4">
                            <CustomRoute route="/projects" name="Projects" />
                            <CustomRoute route='/login' name={authInfo ? 'Logout' : 'Login'} logoutAction={logoutEpic} isLogout={authInfo && true} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

export default NavBar;