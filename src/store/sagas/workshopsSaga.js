import { takeLatest, call, put } from 'redux-saga/effects';
import { SAGA_FETCH_WORKSHOPS } from '@app/store/sagaActions';
import { ApiActionsGetWorkshops } from '@app/api/apiActions';
import { ACTION_WORKSHOP_SET_LIST } from '@app/store/storeActions';

function* fetchWorkshops() {
  yield takeLatest(SAGA_FETCH_WORKSHOPS, function* (action) {
    const { data } = yield call(ApiActionsGetWorkshops);
    yield put({ type: ACTION_WORKSHOP_SET_LIST, payload: data });
  });
}

export default [fetchWorkshops];
