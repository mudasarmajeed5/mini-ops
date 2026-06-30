import {type ReactNode, useEffect, useState} from "react"
import {AuthContext, type CredentialsType} from "./AuthContext.ts";
import type {AuthResult} from "@/src/types/User.ts";
import * as authApi from "@/src/api/auth.ts"

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState('')
    const [user, setUser] = useState<AuthResult["user"]>({id: "", email: ""})

    const handleLogout = async () => {
        setIsLoading(true)
        try {
            const result = await authApi.logout()
            if (result.success) {
                setIsAuthenticated(false)
            }

        } catch {
            setIsAuthenticated(true)
            setError("Server is unavailable")
        } finally {
            setIsLoading(false)
        }
    };
    const handleRegister = async (credentials: CredentialsType): Promise<AuthResult> => {
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
    const handleLogin = async (credentials: CredentialsType): Promise<AuthResult> => {
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
                const result = await response.json()
                setUser(result.user)

            } catch (error) {
                if (error instanceof Error) {
                    setError((error as Error).message)
                    setIsAuthenticated(false)
                }
            } finally {
                setIsLoading(false)
            }
        }
        void checkAuth()
    }, []);
    return (
        <AuthContext value={{
            isAuthenticated,
            isLoading,
            error,
            user,
            logout: handleLogout,
            login: handleLogin,
            register: handleRegister
        }}>
            {children}
        </AuthContext>
    )
}