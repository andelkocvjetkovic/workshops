import { API } from '@app/api/api';

//ApiActionGetWorkshops :: AbortController -> number -> Promise
export const ApiActionsGetWorkshops = abortController => page =>
  API(abortController).get('/workshops', {
    params: {
      _page: page,
      _limit: 2,
    },
  });
