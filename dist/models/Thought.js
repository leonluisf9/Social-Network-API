import { Schema, model, Types } from 'mongoose';
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => createdAt.toLocaleString()
    }
});
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => createdAt.toLocaleString()
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
