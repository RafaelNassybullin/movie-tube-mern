import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { IMovieData } from '../interface';

const MoviesData: Schema<IMovieData> = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: Number, default: Date.now() },
        poster: { type: String, required: true },
        urlvideo: { type: String, required: true },
        metatags: { type: String, required: true },
        category: { type: String, required: true },
        duration: { type: String, required: true },
        views: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

MoviesData.plugin(mongoosePaginate);
MoviesData.plugin(aggregatePaginate);
MoviesData.index({ title: "text", description: "text" });

export default mongoose.model<IMovieData>('MoviesData', MoviesData);