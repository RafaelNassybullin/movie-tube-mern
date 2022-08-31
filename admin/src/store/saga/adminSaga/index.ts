import { put, call, takeLatest } from "redux-saga/effects";
import {
  deleteSuccess,
  deleteError,
  getAdminDataSuccess,
  getAdminDataError,
  getUpadateDataByIdSuccess,
  getUpadateDataByIdError,
  addSuccess,
  addErrors,
  updateSuccess,
  updateError,
} from "store/reducer/adminSlice";
import { getDataAdminApi, deleteDataApi, getVideoIdApi, updateApi, addDataApi } from "api";

function* adminGetDataWorker(action: any) {
  try {
    //@ts-ignore
    const response: any = yield call(getDataAdminApi, action.payload);
    if (response.status === 200) {
      const { docs, totalPages, totalDocs } = response.data;
      yield put(getAdminDataSuccess({ docs, totalPages, totalDocs }));
    }
  } catch (error) {
    yield put(getAdminDataError());
  }
}
function* adminDeleteWorker(action: any) {
  try {
    //@ts-ignore
    const response = yield call(deleteDataApi, action.payload);
    if (response.status === 200) {
      yield put(deleteSuccess());
    }
  } catch (error) {
    yield put(deleteError());
  }
}
function* getUpdateByIdWorker(action: any) {
  try {
    //@ts-ignore
    const response = yield call(getVideoIdApi, action.payload);
    if (response.status === 200) {
      yield put(getUpadateDataByIdSuccess(response.data));
    }
  } catch (error) {
    yield put(getUpadateDataByIdError());
  }
}

function* updateWorker(action: any) {
  const { id, data } = action.payload;
  try {
    //@ts-ignore
    const response = yield call(updateApi, { id, data });
    if (response.status === 200) {
      yield put(updateSuccess());
    }
  } catch (error) {
    yield put(updateError());
  }
}
function* addWorker(action: any) {
  try {
    //@ts-ignore
    const response = yield call(addDataApi, action.payload);
    if (response.status === 200) {
      yield put(addSuccess());
    }
  } catch (error) {
    yield put(addErrors());
  }
}

export function* adminGetDataWatcher() {
  yield takeLatest("admin/getAdminData", adminGetDataWorker);
}
export function* adminDeleteWatcher() {
  yield takeLatest("admin/deleteStart", adminDeleteWorker);
}
export function* getUpdateByIdWatcher() {
  yield takeLatest("admin/getUpadateDataByIdStart", getUpdateByIdWorker);
}
export function* updateWatcher() {
  yield takeLatest("admin/updateStart", updateWorker);
}
export function* addWatcher() {
  yield takeLatest("admin/addStart", addWorker);
}