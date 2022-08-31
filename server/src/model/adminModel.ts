import mongoose, { Schema } from 'mongoose';
import { IAdminAuth } from '../interface';

const AdminAuth: Schema<IAdminAuth> = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IAdminAuth>('AdminAuth', AdminAuth);