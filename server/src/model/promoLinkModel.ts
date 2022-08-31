import mongoose, { Schema } from 'mongoose';
import { IPromo } from '../interface';

const PromotionVastLink: Schema<IPromo> = new Schema(
  {
    link: { type: String, required: false }
  }
);

export default mongoose.model<IPromo>('PromotionVastLink', PromotionVastLink);