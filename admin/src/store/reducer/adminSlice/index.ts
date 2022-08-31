import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovieData } from "interface"

interface IAdminAuthState {
  page: number,
  editModalState: string,
  areYouSureModalState: string,
  adminLoading: boolean,
  adminData: [],
  allDataCount: number,
  count: number,
  adminError: boolean,
  addLoading: boolean,
  addError: boolean,
  updateLoading: boolean,
  updateData: {},
  updateError: boolean,
  deleteLoading: boolean,
  deleteError: boolean,
}


const adminAuthState: IAdminAuthState = {
  page: 1,
  editModalState: "",
  areYouSureModalState: "",

  adminLoading: false,
  adminData: [],
  allDataCount: 0,
  count: 10,
  adminError: false,

  addLoading: false,
  addError: false,

  updateLoading: false,
  updateData: {},
  updateError: false,

  deleteLoading: false,
  deleteError: false,
};

export const adminAuthSlice = createSlice({
  name: "admin",
  initialState: adminAuthState,
  reducers: {
    openAreYouSureModal: (state, action) => {
      state.areYouSureModalState = action.payload;
    },
    openEditModal: (state, action) => {
      state.editModalState = action.payload;
    },
    getAdminData: (state, action: PayloadAction<any>) => {
      state.adminLoading = true;
    },
    getAdminDataSuccess: (state, action) => {
      state.count = action.payload.totalPages;
      state.allDataCount = action.payload.totalDocs;
      state.adminData = action.payload.docs;
      state.adminLoading = false;
      state.adminError = false;
    },
    getAdminDataError: (state) => {
      state.adminLoading = true;
      state.adminError = true;
    },
    addStart: (state, action: PayloadAction<any>) => {
      state.addLoading = true;
    },
    addSuccess: (state) => {
      state.addLoading = false;
    },
    addErrors: (state) => {
      state.addError = true;
      state.addLoading = false;
    },
    updateStart: (state, action: PayloadAction<{ id?: string, data: IMovieData }>) => {
      state.updateLoading = true;
    },
    updateSuccess: (state) => {
      state.updateLoading = false;
      state.updateError = false;
    },
    updateError: (state) => {
      state.updateError = true;
      state.updateLoading = false;
    },
    getUpadateDataByIdStart: (state, action: PayloadAction<any>) => {
      state.updateLoading = true;
    },
    getUpadateDataByIdSuccess: (state, action) => {
      state.updateData = action.payload;
      state.updateLoading = false;
      state.updateError = false;
    },
    getUpadateDataByIdError: (state) => {
      state.updateError = true;
      state.updateLoading = false;
    },
    deleteStart: (state, action:PayloadAction<any>) => {
      state.deleteLoading = true;
    },
    deleteSuccess: (state) => {
      state.deleteLoading = false;
    },
    deleteError: (state) => {
      state.deleteError = true;
      state.deleteLoading = false;
    },
  },
});

export const {
  openAreYouSureModal,
  openEditModal,
  getAdminData,
  getAdminDataSuccess,
  getAdminDataError,
  addStart,
  addSuccess,
  addErrors,
  updateStart,
  updateSuccess,
  updateError,
  getUpadateDataByIdStart,
  getUpadateDataByIdSuccess,
  getUpadateDataByIdError,
  deleteStart,
  deleteSuccess,
  deleteError,
} = adminAuthSlice.actions;

export const adminReducer = adminAuthSlice.reducer;
