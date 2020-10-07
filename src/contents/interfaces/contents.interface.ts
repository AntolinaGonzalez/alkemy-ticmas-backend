import { Document } from 'mongoose'

export interface Content extends Document {
    readonly title: string;
    readonly description: string;
    readonly media: [
        {
            tilte: string,
            description: string,
            url: string
        }
    ]
    seccion_id: string,
    readonly published_at: Date,
    readonly created_at: Date,
    readonly updated_at: Date,
    readonly delete_at: Date,
}