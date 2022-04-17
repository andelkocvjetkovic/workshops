import { all, spawn, call, take, put } from 'redux-saga/effects';
import workshopsSaga from '@app/store/sagas/workshopsSaga';
import { SAGA_STARTUP_APP, SAGA_WORKSHOPS_SET } from '@app/store/sagaActions';
import { ACTION_WORKSHOP_SET_ACTIVE_FILTER } from '@app/store/storeActions';
//https://redux-saga.js.org/docs/advanced/RootSaga#keeping-everything-alive
export default function* rootSaga() {
  const sagas = [
    ...workshopsSaga,
    function* () {
      const { payload } = yield take(SAGA_STARTUP_APP);
      yield put({ type: ACTION_WORKSHOP_SET_ACTIVE_FILTER, payload });
      yield put({ type: SAGA_WORKSHOPS_SET });
    },
  ];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      })
    )
  );
}
