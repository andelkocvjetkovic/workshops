import { all, spawn, call, put } from 'redux-saga/effects';
import workshopsSaga from '@app/store/sagas/workshopsSaga';
import { SAGA_FETCH_WORKSHOPS } from '@app/store/sagaActions';
//https://redux-saga.js.org/docs/advanced/RootSaga#keeping-everything-alive
export default function* rootSaga() {
  const sagas = [
    ...workshopsSaga,
    /* eslint-disable require-yield */
    function* () {
      console.log('saga started');
      yield put({ type: SAGA_FETCH_WORKSHOPS });
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
