import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";

const isAuth = (state: RootState) => state.auth.isAuth;
export const isAuthReselect = createSelector(isAuth, (bool) => {
  return bool;
});

const isLoading = (state: RootState) => state.auth.isLoading;
export const isLoadingReselect = createSelector(isLoading, (bool) => {
  return bool;
});

const isCheckLoader = (state: RootState) => state.auth.isCheckLoader;
export const isCheckLoaderReselect = createSelector(isCheckLoader, (bool) => {
  return bool;
});