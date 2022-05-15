import { API } from '@app/api/api';
import { FILTERS } from '@app/utils/types';
import { fromPromised, task } from 'folktale/concurrency/task';
import * as R from 'ramda';

//ApiActionGetWorkshops :: AbortController -> number -> Promise
export const ApiActionsGetWorkshops =
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

//ApiActionPostOrder :: order -> Promise
export const ApiActionPostOrder = order =>
  API().post('/orders', {
    order,
  });

//ApiActionGetWorkshop -> number -> Task
export const ApiActionGetWorkshop = fromPromised(workshopId => API().get(`/workshops/${workshopId}`));

//ApiActionGetUser -> number -> Promise
export const ApiActionGetUser = userId => API().get(`/users/${userId}`);

//ApiActionGetWorkshopCancelable :: number -> Task
export const ApiActionGetWorkshopCancelable = workshopId =>
  task(resolver => {
    const abortController = new AbortController();
    API(abortController)
      .get('/workshops')
      .then(resolver.resolve)
      .catch(e => !resolver.isCancelled && resolver.rejected(e));
    resolver.onCancelled(() => abortController.abort());
  });
