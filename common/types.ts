export interface Admin {
    id: string
    username: string
    name: string
    password: string
}

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
}
