import { Schema } from 'mongoose'

export const SeccionsSchema = new Schema({
    
    title: { type: String, required: true},
    
    description: {type: String, required: true},

    content: {type: String,  required: true},

  
    course_id: {
        type: String
    },

    creator_id : { 
        type: Schema.Types.ObjectId, 
        ref: 'Course' 
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


