import { takeLatest, call, put, cancelled, select, take, delay } from 'redux-saga/effects';
import { SAGA_WORKSHOPS_APPEND, SAGA_WORKSHOPS_ORDER, SAGA_WORKSHOPS_SET } from '@app/store/sagaActions';
import { ApiActionPostOrder, ApiActionsGetWorkshops } from '@app/api/apiActions';
import {
  ACTION_WORKSHOP_APPEND_LIST,
  ACTION_WORKSHOP_SET,
  ACTION_WORKSHOP_SET_FETCH_STATUS,
  ACTION_WORKSHOP_SET_LIMIT_EXCEEDED,
} from '@app/store/storeActions';
import { FETCH_STATUS } from '@app/utils/types';
import {
  selectCurrentApiPage,
  selectIsPagesLimitExceeded,
  selectWorkshopActiveFilter,
} from '@app/store/reducers/workshopListSlice';
import { selectCartProducts } from '@app/store/reducers/cartSlice';

function* workshopAppend() {
  yield takeLatest(SAGA_WORKSHOPS_APPEND, function* () {
    const isLimitExceeded = yield select(selectIsPagesLimitExceeded);
    if (!isLimitExceeded) {
      const abortController = new AbortController();
      try {
        yield put({ type: ACTION_WORKSHOP_SET_FETCH_STATUS, payload: FETCH_STATUS.LOADING });
        const activeFilter = yield select(selectWorkshopActiveFilter);
        const currentApiPage = yield select(selectCurrentApiPage);
        const { data } = yield call(ApiActionsGetWorkshops(abortController), {
          page: currentApiPage,
          category: activeFilter,
        });
        if (data.length === 0) yield put({ type: ACTION_WORKSHOP_SET_LIMIT_EXCEEDED, payload: true });
        else yield put({ type: ACTION_WORKSHOP_APPEND_LIST, payload: data });
      } catch (e) {
        console.log(e);
        yield put({ type: ACTION_WORKSHOP_SET_FETCH_STATUS, payload: FETCH_STATUS.ERROR });
      } finally {
        if (yield cancelled()) abortController.abort();
      }
    }
  });
}

function* workshopsSet() {
  yield takeLatest(SAGA_WORKSHOPS_SET, function* () {
    const abortController = new AbortController();
    try {
      const activeFilter = yield select(selectWorkshopActiveFilter);
      const { data } = yield call(ApiActionsGetWorkshops(abortController), {
        page: 1,
        category: activeFilter,
      });
      yield put({ type: ACTION_WORKSHOP_SET, payload: data });
    } catch (e) {
      console.log(e);
      yield put({ type: ACTION_WORKSHOP_SET_FETCH_STATUS, payload: FETCH_STATUS.ERROR });
    } finally {
      if (yield cancelled()) abortController.abort();
    }
  });
}

function* workshopsOrder() {
  while (true) {
    const {
      payload,
      meta: { onStart, onSuccess },
    } = yield take(SAGA_WORKSHOPS_ORDER);
    const products = yield select(selectCartProducts);
    onStart();
    try {
      yield call(ApiActionPostOrder, { ...payload, products });
      yield delay(3000);
      onSuccess();
    } catch (e) {
      console.log(e);
    }
  }
}

export default [workshopAppend, workshopsSet, workshopsOrder];
