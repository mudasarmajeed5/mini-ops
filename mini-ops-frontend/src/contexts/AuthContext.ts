import {createContext} from 'react'
type AuthResult = {
    success: boolean,
    message: string
}
export type CredentialsType = {
    email: string,
    password: string
}

type AuthContextType = {
    isLoading: boolean,
    isAuthenticated: boolean,
    error: string,
    login: (credentials: CredentialsType) => Promise<AuthResult>,
    logout: () => Promise<AuthResult>,
    register: (credentials: CredentialsType) => Promise<AuthResult>
}
export const AuthContext = createContext<AuthContextType | null>(null)