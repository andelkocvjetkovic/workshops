import daggy from 'daggy';

export const Leaf = daggy.taggedSum('Leaf', {
  Unloaded: [],
  Loading: [],
  Loaded: ['state'],
  Failed: [],
});

export default function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case WORKSHOP_FETCHED: {
      return Leaf.Loaded(payload);
    }
    case WORKSHOP_REQUESTED: {
      return Leaf.Loading;
    }
    case WORKSHOP_FAILED: {
      return Leaf.Failed;
    }
    case WORKSHOP_LEFT: {
      return Leaf.Unloaded;
    }
    default: {
      throw Error('Unknown action type ' + type);
    }
  }
}
// ==================================
export const WORKSHOP_FETCHED = 'WORKSHOP_FETCHED';
export const WORKSHOP_REQUESTED = 'WORKSHOP_REQUESTED';
export const WORKSHOP_FAILED = 'WORKSHOP_FAILED';
export const WORKSHOP_LEFT = 'WORKSHOP_LEFT';
