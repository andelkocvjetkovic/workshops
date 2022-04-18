import { API } from '@app/api/api';
import { FILTERS } from '@app/utils/types';

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

//ApiActionGetWorkshop -> number -> Promise
export const ApiActionGetWorkshop = workshopId => API().get(`/workshops/${workshopId}`);

//ApiActionGetUser -> number -> Promise
export const ApiActionGetUser = userId => API().get(`/users/${userId}`);
