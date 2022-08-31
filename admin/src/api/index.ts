import { $getSecure } from "http/secure";
import $api, { API_URL } from "../http";
import axios from "axios";
import { IMovieData, IAuthForms } from "interface"

export const categoryArray: string[] = [
  "dorama",
  "anime",
  "action",
  "adventure",
  "comedy",
  "horrors",
  "drama",
  "fantasy",
  "horror",
  "mystery",
  "thriller",
  "western",
];

interface IUpdate {
  id: string;
  data: IMovieData;
}

export const getVideoIdApi = async (id: string) =>
  await $getSecure.get(`${API_URL}/movieData/${id}`);

export const loginApi = async ({ email, password }: IAuthForms) =>
  await $api.post(`${API_URL}/login`, { email, password });

export const checkAuthApi = async () =>
  await axios.get(`${API_URL}/refresh`, { withCredentials: true });

export const logOutApi = async () => $api.post(`${API_URL}/logout`);

export const getDataAdminApi = async (page: number) =>
  await $api.get(`${API_URL}/movieAdminData?page=${page}&limit=10`);

export const deleteDataApi = async (id: string) =>
  await $api.delete(`${API_URL}/movieData/${id}`);

export const addDataApi = async (data: IMovieData) =>
  await $api.post(`${API_URL}/movieData`, data);

export const updateApi = async ({ id, data }: IUpdate) =>
  await $api.patch(`${API_URL}/movieData/${id}`, data);

export const saveNewVastLink = async (vastLink: string) =>
  await $api.post(`${API_URL}/sponsorVastLink`, { vastLink });
