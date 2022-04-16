import { API } from '@app/api/api';
import { FILTERS } from '@app/utils/types';

//ApiActionGetWorkshops :: AbortController -> number -> Promise
export const ApiActionsGetWorkshops =
  abortController =>
  ({ page, category }) =>
    API(abortController).get('/workshops', {
      params: {
        _page: page,
        _limit: 9,
        _sort: 'date',
        _order: 'desc',
        ...(category !== FILTERS.ALL ? { category } : {}),
      },
    });
