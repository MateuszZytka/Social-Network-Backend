const { Schema, model, Types } = require('mongoose');

// Schema to create Thoughts model

const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get:(v) =>{
                const date = new Date(v);
                return date.toLocaleString();
            },
        }
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Text is required",
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get:(v) =>{
                const date = new Date(v);
                return date.toLocaleString();
            }
        },
        username: { 
            type: String, 
            required: true 
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
      }
)

// a virtual that returns the count of objects in the reactions array
thoughtSchema.virtual('virtualCOunt').get(function(){
    return `${this.reactions.length}`
})

//initialize our Thoughts model
const Thought = model('thought', thoughtSchema)

module.exports = Thought
