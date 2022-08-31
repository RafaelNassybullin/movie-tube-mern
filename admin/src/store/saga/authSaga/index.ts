import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import { loginApi, checkAuthApi, logOutApi } from "api";
import {
  loginSuccess,
  loginError,
  checkAuthSuccess,
  checkAuthError,
} from "store/reducer/authSlice";

function* loginWorker(action:any) {
  //@ts-ignore
  const response = yield call(loginApi, action.payload);
  try {
    if (response.status === 200) {
      yield put(loginSuccess(response.data));
    }
  } catch (error) {
    yield put(loginError());
  }
}

function* checkAuthWorker() {
  //@ts-ignore
  const response = yield call(checkAuthApi);
  try {
    if (response.status === 200) {
      yield put(checkAuthSuccess(response.data));
    }
  } catch (error) {
    yield put(checkAuthError());
  }
}

function* logOutWorker() {
  yield call(logOutApi);
}

export function* loginWatcher() {
  yield takeLatest("auth/login", loginWorker);
}
export function* checkAuthWatcher() {
  yield takeEvery("auth/checkAuth", checkAuthWorker);
}
export function* logOutWatcher() {
  yield takeLatest("auth/logout", logOutWorker);
}

