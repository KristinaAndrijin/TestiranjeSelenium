export interface LoginResponse {
    accessToken: string,
    refreshToken: string
}
export interface AuthenticationRequestDTO {
    email: string,
    password: string
}

export interface LoginCreateCode {
    token: string
}

export interface LoginSecondStepRequest {
    token: string|null,
    code: string
}