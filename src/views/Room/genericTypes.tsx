export interface User {
    id: string;
}

export interface Message extends User {
    message: string;
}