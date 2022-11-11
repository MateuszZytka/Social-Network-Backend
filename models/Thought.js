const { Schema, model, Types } = require('mongoose');

// Schema to create Thoughts model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Text is required",
            match: '/^.{1,280}$/'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get:(date) =>{
                let date = new Date();
                return date.toLocaleString();
            }
        },
        username: { type: String, required: true },
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

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            match: '/^.{1,280}$/'
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        get:() =>{
            let date = new Date();
            return date.toLocaleString();
        },
    },
    {
        toJSON: {
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
const Thoughts = model('thoughts', thoughtSchema)

module.exports = Thoughts