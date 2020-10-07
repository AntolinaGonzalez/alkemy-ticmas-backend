import { Schema } from 'mongoose'

export const ContentsSchema = new Schema({
    title: { type: String, required: true },

    description: { type: String, required: true },

    media : [
        {title : String,
        description: String,
        url: String}
        ],

    seccion_id: {
        type: Schema.Types.ObjectId,
        ref: 'Seccion'
    },
    published_at: Date,


    created_at: {
        type: Date,
        default: Date.now()
    },

    updated_at: {
        type: Date,
        default: Date.now()
    },


    delete_at: Date
})