import { Schema } from 'mongoose'

export const CoursesSchema = new Schema({
    
    title: { type: String, required: true},
    
    description: {type: String, required: true},
    
    keywords: [String],

  
    creator_id: {
        type: String
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

 
    delete_at: Date,
});


