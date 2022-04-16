import { API } from '@app/api/api';
import { FILTERS } from '@app/components/filter-category/utils/Filter';

//ApiActionGetWorkshops :: AbortController -> number -> Promise
export const ApiActionsGetWorkshops =
  abortController =>
  ({ page, category }) =>
    API(abortController).get('/workshops', {
      params: {
        _page: page,
        _limit: 2,
        _sort: 'date',
        _order: 'desc',
        ...(category !== FILTERS.ALL ? { category } : {}),
      },
    });
