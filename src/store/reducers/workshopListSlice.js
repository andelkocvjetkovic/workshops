import {
  ACTION_WORKSHOP_APPEND_LIST,
  ACTION_WORKSHOP_RESET,
  ACTION_WORKSHOP_SET,
  ACTION_WORKSHOP_SET_ACTIVE_FILTER,
  ACTION_WORKSHOP_SET_FETCH_STATUS,
  ACTION_WORKSHOP_SET_LIMIT_EXCEEDED,
} from '@app/store/storeActions';
import { FETCH_STATUS, FILTERS } from '@app/utils/types';

const initialState = {
  list: [],
  activeFilter: FILTERS.ALL,
  currentApiPage: 1,
  isPagesLimitExceeded: false,
  fetchStatus: FETCH_STATUS.IDLE,
};
export default function workshopReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_WORKSHOP_SET: {
      return {
        ...state,
        list: payload,
        currentApiPage: 2,
        fetchStatus: FETCH_STATUS.IDLE,
        isPagesLimitExceeded: false,
      };
    }
    case ACTION_WORKSHOP_APPEND_LIST: {
      return {
        ...state,
        list: state.list.concat(payload),
        fetchStatus: FETCH_STATUS.IDLE,
        currentApiPage: state.currentApiPage + 1,
      };
    }
    case ACTION_WORKSHOP_SET_LIMIT_EXCEEDED: {
      return {
        ...state,
        isPagesLimitExceeded: payload,
      };
    }
    case ACTION_WORKSHOP_SET_FETCH_STATUS: {
      return {
        ...state,
        fetchStatus: payload,
      };
    }
    case ACTION_WORKSHOP_SET_ACTIVE_FILTER: {
      return {
        ...state,
        activeFilter: payload,
      };
    }
    case ACTION_WORKSHOP_RESET: {
      return initialState;
    }
    default:
      return state;
  }
}
export const selectWorkshopList = state => state.workshopList.list;
export const selectCurrentApiPage = state => state.workshopList.currentApiPage;
export const selectIsPagesLimitExceeded = state => state.workshopList.isPagesLimitExceeded;
export const selectWorkshopActiveFilter = state => state.workshopList.activeFilter;
export const selectWorkshopFetchStatus = state => state.workshopList.fetchStatus;
