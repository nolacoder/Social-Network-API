const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const userSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: [1, "Please enter at least one character"],
            max: [200, "You have exceeded the limit of 200 characters"]
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },

        username: {
            type: String,
            required: true
        },

        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
    }
)

// Create getter function

// Virtual 
userSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
