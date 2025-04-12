import { Schema, Document, model, Types } from 'mongoose';

interface IReaction extends Document {
  reactionId: Schema.Types.ObjectId;
  reactionBody: String;
  username: String;
  createdAt: Date;
}

interface IThought extends Document {
  thoughtText: string,
  createdAt: Date,
  username: string,
  reactions: IReaction[];
}

const reactionSchema = new Schema<IReaction>({ 
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
    get: (createdAt: any) => createdAt.toLocaleString()
  }
});

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt: any) => createdAt.toLocaleString()
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
})

const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;
