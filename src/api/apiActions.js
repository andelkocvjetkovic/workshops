import { API } from '@app/api/api';

export const ApiActionsGetWorkshops = abortController => API(abortController).get('/workshops');
