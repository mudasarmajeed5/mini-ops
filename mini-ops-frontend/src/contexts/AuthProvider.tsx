import {type ReactNode, useEffect, useState} from "react"
import {AuthContext, type CredentialsType} from "./AuthContext.ts";

type AuthProviderProps = {
    children: ReactNode
}
type AuthResult = {
    success: boolean,
    message: string
}
export const AuthProvider = ({children}: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState('')


    const handleLogout = async (): Promise<AuthResult> => {
        const response = await fetch("/api/auth/logout", {
            method: "GET",
        });
        const result = await response.json()
        if (response.ok) {
            setIsAuthenticated(false)
            return {
                success: true,
                message: result.message
            }
        }
        return{
            success: false,
            message: "Failed to logout"
        }
    };
    const handleRegister = async (credentials: CredentialsType):Promise<AuthResult> => {
        setIsLoading(true);
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const result = await response.json();
        if (result.success) {
            setIsLoading(false);
            setIsAuthenticated(true)
            return {
                success: true,
                message: result.message
            }
        } else {
            setIsLoading(false);
            return {
                success: false,
                message: result.message
            }
        }
    };
    const handleLogin = async (credentials: CredentialsType):Promise<AuthResult> => {
        setIsLoading(true);
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const result = await response.json();
        if (result.success) {
            setIsLoading(false);
            setIsAuthenticated(true)
            return {
                success: true,
                message: result.message
            }
        } else {
            setIsLoading(false);
            return {
                success: false, message: result.message
            }
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setError('')
                const response = await fetch('/api/auth/me', {
                    credentials: 'include'
                })
                if (response.ok) {
                    setIsAuthenticated(true)
                }
                if (response.status == 502) {
                    setError("Server is unavailable")
                }

            } catch (error) {
                if (error instanceof Error) {
                    setError((error as Error).message)
                    setIsAuthenticated(false)
                }
            } finally {
                setIsLoading(false)
            }
        }
        checkAuth()
    }, []);
    return (
        <AuthContext value={{
            isAuthenticated,
            isLoading,
            error,
            logout: handleLogout,
            login: handleLogin,
            register: handleRegister
        }}>
            {children}
        </AuthContext>
    )
}