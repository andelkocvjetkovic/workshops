import { takeLatest, call, put, cancelled, select } from 'redux-saga/effects';
import { SAGA_FETCH_WORKSHOPS } from '@app/store/sagaActions';
import { ApiActionsGetWorkshops } from '@app/api/apiActions';
import {
  ACTION_WORKSHOP_APPEND_LIST,
  ACTION_WORKSHOP_SET_FETCH_STATUS,
  ACTION_WORKSHOP_SET_LIMIT_EXCEEDED,
} from '@app/store/storeActions';
import { FETCH_STATUS } from '@app/utils/types';
import { selectCurrentApiPage, selectIsPagesLimitExceeded } from '@app/store/reducers/workshopSlice';

function* fetchWorkshops() {
  yield takeLatest(SAGA_FETCH_WORKSHOPS, function* (action) {
    const isLimitExceeded = yield select(selectIsPagesLimitExceeded);
    if (!isLimitExceeded) {
      const abortController = new AbortController();
      try {
        yield put({ type: ACTION_WORKSHOP_SET_FETCH_STATUS, payload: FETCH_STATUS.LOADING });
        const currentApiPage = yield select(selectCurrentApiPage);
        const { data } = yield call(ApiActionsGetWorkshops(abortController), {
          page: currentApiPage,
          category: 'frontend',
        });
        if (data.length === 0) yield put({ type: ACTION_WORKSHOP_SET_LIMIT_EXCEEDED, payload: true });
        else yield put({ type: ACTION_WORKSHOP_APPEND_LIST, payload: data });
      } catch (e) {
        console.log(e);
        yield put({ type: FETCH_STATUS.ERROR });
      } finally {
        if (yield cancelled()) {
          abortController.abort();
        }
      }
    }
  });
}

export default [fetchWorkshops];
