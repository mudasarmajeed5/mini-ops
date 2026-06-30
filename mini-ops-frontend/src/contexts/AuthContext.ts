import {createContext} from 'react'
import type {AuthResult} from "@/src/types/User.ts";
export type CredentialsType = {
    email: string,
    password: string
}

type AuthContextType = {
    isLoading: boolean,
    isAuthenticated: boolean,
    error: string,
    login: (credentials: CredentialsType) => Promise<AuthResult>,
    logout: () => Promise<void>,
    user: AuthResult["user"],
    register: (credentials: CredentialsType) => Promise<AuthResult>
}
export const AuthContext = createContext<AuthContextType | null>(null)