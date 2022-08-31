import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../index";

const areYouSureModalStateSelector = (state: RootState) => state.admin.areYouSureModalState;
const editModalStateSelector = (state: RootState) => state.admin.editModalState;
const updateData = (state: RootState) => state.admin.updateData;
const dataAdminSelector = (state: RootState) => state.admin.adminData;
const countAdminSelector = (state: RootState) => state.admin.count;
const allDataCountSelector = (state: RootState) => state.admin.allDataCount;
const loaderAdminSelector = (state: RootState) => state.admin.adminLoading;

export const areYouSureModalStateReselect = createSelector(areYouSureModalStateSelector, (modal) => {
  return modal
});

export const editModalStateReselect = createSelector(editModalStateSelector, (edit) => {
  return edit
});

export const dataAdminReselect = createSelector(dataAdminSelector, (data) => {
  return data;
});

export const countAdminReselect = createSelector(countAdminSelector, (count) => {
  return count;
});

export const allDataCountReselect = createSelector(allDataCountSelector, (count) => {
  return count;
});

export const loaderReselect = createSelector(loaderAdminSelector, (load) => {
  return load;
});

export const updateDataReselect = createSelector(updateData, (data) => {
  return data
});
