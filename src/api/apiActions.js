import { API } from '@app/api/api';
import { FILTERS } from '@app/utils/types';
import { fromPromised, task } from 'folktale/concurrency/task';

//ApiActionGetWorkshops :: AbortController -> WorkshopsRequest -> Promise
export const ApiActionsGetWorkshopsPromise =
  abortController =>
  ({ page, category, limit = 9, ...rest }) =>
    API(abortController).get('/workshops', {
      params: {
        _page: page,
        _limit: limit,
        _sort: 'date',
        _order: 'desc',
        ...rest,
        ...(category !== FILTERS.ALL ? { category } : {}),
      },
    });
// ApiActionGetWorkshops :: WorkshopsRequest -> Task
export const ApiActionGetWorkshops = fromPromised(({ page, category, limit = 9, ...rest }) =>
  API().get('/workshops', {
    params: {
      _page: page,
      _limit: limit,
      _sort: 'date',
      _order: 'desc',
      ...rest,
      ...(category !== FILTERS.ALL ? { category } : {}),
    },
  })
);
//ApiActionPostOrder :: Order -> Task
export const ApiActionPostOrder = fromPromised(order =>
  API().post('/orders', {
    order,
  })
);

//ApiActionGetWorkshop -> number -> Task
export const ApiActionGetWorkshop = fromPromised(workshopId => API().get(`/workshops/${workshopId}`));

//ApiActionGetUser -> number -> Task
export const ApiActionGetUser = fromPromised(userId => API().get(`/users/${userId}`));

//ApiActionGetWorkshopCancelable :: number -> Task
export const ApiActionGetWorkshopCancelable = workshopId =>
  task(resolver => {
    const abortController = new AbortController();
    API(abortController)
      .get(`/workshops/${workshopId}`)
      .then(resolver.resolve)
      .catch(e => !resolver.isCancelled && resolver.rejected(e));
    resolver.onCancelled(() => abortController.abort());
  });
