import { Document, Schema } from 'mongoose';

export interface IMovieData extends Document {
  title: string,
  description: string,
  date: number,
  poster: string,
  urlvideo: string,
  metatags: string,
  category: string,
  duration: string,
  views: string
}

export interface IToken extends Document {
  user: typeof Schema.Types.ObjectId,
  refreshToken: string,
}

export interface IAdminAuth extends Document {
  email: string,
  password: string
}

export interface IPromo extends Document {
  link: string
}

export interface PageLimit {
  page?: string;
  limit?: string;
  id?: string;
  category?: string;
  search?: string;
}