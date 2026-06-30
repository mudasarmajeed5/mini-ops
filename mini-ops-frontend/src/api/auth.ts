import type {AuthResult} from "@/src/types/User.ts";
import type {CredentialsType} from "@/src/contexts/AuthContext.ts";

export const logout = async (): Promise<AuthResult
> => {
    const response = await fetch('/api/auth/logout', {
        credentials: 'include'
    })
    return response.json()
}

export const login = async (credentials: CredentialsType): Promise<AuthResult> => {
    const response = await fetch('/api/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)
    })
    return response.json()
}
export const register = async (credentials: CredentialsType): Promise<AuthResult> => {
    const res = await fetch('/api/auth/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    return res.json()
}

export const me = async ():Promise<AuthResult> => {
    const res = await fetch('/api/auth/me', {
        credentials: "include"
    })
    return res.json()
}