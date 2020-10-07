import { Document } from 'mongoose'

export interface Course extends Document {
    readonly title: string;
    readonly description: string;
    readonly keywords: [String],
             creator_id: string,
    readonly published_at: Date,
    readonly created_at: Date,  
    readonly updated_at: Date, 
    readonly delete_at: Date,
}