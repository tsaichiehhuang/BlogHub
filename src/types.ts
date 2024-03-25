export interface Issue {
    id: number
    title: string
    body: string
    created_at: string
    labels: any
    comments_url: string
    comments: number
}

export interface Comment {
    id: number
    user: {
        avatar_url: string
        login: string
    }
    body: string
}

export interface Label {
    name: string
    color: string
}
export interface ValidationError {
    title?: string
    body?: string
    comment?: string
}
