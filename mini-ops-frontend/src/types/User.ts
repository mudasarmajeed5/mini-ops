export type AuthResult = {
    success: boolean,
    message: string,
    user?: {
        id: string,
        email: string
    }
}