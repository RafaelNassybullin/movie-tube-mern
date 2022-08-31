import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { adminReducer } from "store/reducer/adminSlice";
import { authReducer } from "store/reducer/authSlice";
import { all, fork } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import {
  adminGetDataWatcher,
  adminDeleteWatcher,
  getUpdateByIdWatcher,
  updateWatcher,
  addWatcher,
} from "store/saga/adminSaga";
import {
  loginWatcher, 
  checkAuthWatcher,
  logOutWatcher
} from "store/saga/authSaga"

function* RootSaga() {
  yield all([
    fork(loginWatcher),
    fork(checkAuthWatcher),
    fork(logOutWatcher),
    fork(adminGetDataWatcher),
    fork(addWatcher),
    fork(getUpdateByIdWatcher),
    fork(updateWatcher),
    fork(adminDeleteWatcher),
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof store.getState>
