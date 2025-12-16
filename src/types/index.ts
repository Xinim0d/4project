// This file exports TypeScript interfaces and types used in the application for better type safety.

export interface User {
    id: string;
    email: string;
    displayName?: string;
}

export interface Item {
    id: string;
    name: string;
    description: string;
    quantity: number;
    createdAt: Date;
    addedBy: User;
}

export interface OutgoingItem {
    id: string;
    itemId: string;
    departureDate: Date;
    transferredBy: User;
}