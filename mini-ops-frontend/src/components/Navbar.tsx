import {Button} from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";
import {LogOut} from "lucide-react";
import {useAuth} from "@/src/hooks/useAuth";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const {logout, user} = useAuth();
    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        navigate('/login')
    }

    const username = user!.email.split("@")[0] || "U";
    const initial = username.charAt(0).toUpperCase();

    return (
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <div>
                    <h1 className="text-xl font-bold text-white">
                        Mini Ops Dashboard
                    </h1>

                    <p className="text-xs text-zinc-400">
                        Monitor your API services
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                        <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-zinc-800 text-white">
                                {initial}
                            </AvatarFallback>
                        </Avatar>

                        <span className="text-sm font-medium text-white">
                            {username}
                        </span>

                        <div className="h-6 w-px bg-zinc-800"/>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="gap-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        >
                            <LogOut className="h-4 w-4"/>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}