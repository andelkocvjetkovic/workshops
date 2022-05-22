import {
  ACTION_WORKSHOP_FAILED,
  ACTION_WORKSHOP_FETCHED,
  ACTION_WORKSHOP_NOT_FOUND,
  ACTION_WORKSHOP_NO_MORE,
  ACTION_WORKSHOP_REQUESTED,
  ACTION_WORKSHOP_REQUESTED_MORE,
} from '@app/store/storeActions';
import daggy from 'daggy';

export const Leaf = daggy.taggedSum('Leaf', {
  Unloaded: [],
  Loading: [],
  Loaded: ['list', 'apiPage'],
  NoMore: ['list'],
  LoadingMore: ['list'],
  NotFound: [],
  Failed: [],
});

export default function workshopReducer(state = Leaf.Unloaded, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTION_WORKSHOP_REQUESTED:
      return Leaf.Loading;
    case ACTION_WORKSHOP_REQUESTED_MORE:
      return Leaf.LoadingMore(state.list);
    case ACTION_WORKSHOP_FETCHED:
      return Leaf.Loaded(payload.list, payload.apiPage);
    case ACTION_WORKSHOP_FAILED:
      return Leaf.Loaded;
    case ACTION_WORKSHOP_NOT_FOUND:
      return Leaf.NotFound;
    case ACTION_WORKSHOP_NO_MORE:
      return Leaf.NoMore(payload);
    default:
      return state;
  }
}

export const selectWorkshopListState = state => state.workshopList;
