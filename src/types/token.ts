import { Document, Types } from 'mongoose';

export interface IToken extends Document {
  userId: Types.ObjectId; 
  token: string;
  createdAt: Date;
}
