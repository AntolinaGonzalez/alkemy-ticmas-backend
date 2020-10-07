import { Document } from 'mongoose';

export interface User extends Document {
    readonly email: string,
    readonly password: string,
    readonly created_at: Date,
    readonly updated_at: Date,
    readonly delete_at: Date
}