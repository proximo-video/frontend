export interface User {
    userId: string;
    displayName: string;
}

export interface Message extends User {
    message: string;
}