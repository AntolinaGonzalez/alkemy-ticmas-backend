import { Schema } from 'mongoose';

export const UsersSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    
    created_at: {
        type: Date, 
        default: Date.now()
    },

    updated_at: {
        type: Date, 
        default: Date.now()
    },

    delete_at: {
        type: Date
    },
})