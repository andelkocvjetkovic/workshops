import { ACTION_WORKSHOP_SET_LIST } from '@app/store/storeActions';
import { FILTERS } from '@app/components/filter-category/utils/Filter';

const initialState = {
  list: [],
  activeFilter: FILTERS.ALL,
};
export default function workshopReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_WORKSHOP_SET_LIST: {
      return {
        ...state,
        list: payload,
      };
    }
    default:
      return state;
  }
}
export const selectWorkshopList = state => state.workshop.list;
