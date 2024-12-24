import mongoose, { Schema } from 'mongoose';
import { IToken } from '../types/token';

const tokenSchema = new Schema<IToken>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7 * 24 * 60 * 60, // 7 days
  },
});

const Token = mongoose.model<IToken>('Token', tokenSchema);

export default Token;

