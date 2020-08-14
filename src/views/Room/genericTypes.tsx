export interface User {
    id: string;
}

export interface MessageType extends User {
    message: string;
}

export interface EntryRequest {
    id: string;
    displayName: string;
}