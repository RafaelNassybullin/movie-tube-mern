export interface IMovieData {
  _id: string;
  title: string;
  description: string;
  date: number;
  poster: string;
  urlvideo: string;
  metatags: string;
  category: string,
  duration: string,
  views: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}

export interface IPaginate {
  docs: [IMovieData]
  totalDocs: number,
  limit: number,
  totalPages: number,
  page?: number | undefined | string,
  pagingCounter: number,
  hasPrevPage: boolean,
  hasNextPage: boolean,
  prevPage?: number | null | undefined,
  nextPage?: number | null | undefined,
  meta?: any
}

export interface IAuthForms {
  email: string;
  password: string;
}

export interface IPromo {
  _id: string;
  link: string;
}