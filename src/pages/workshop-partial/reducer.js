export default function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case WORKSHOP_SET: {
      return {
        ...state,
        workshop: payload,
      };
    }
    case WORKSHOP_FETCH_STATUS: {
      return {
        ...state,
        fetchStatus: payload,
      };
    }
    case WORKSHOP_RELATED: {
      return {
        ...state,
        relatedWorkshops: payload,
      };
    }
    case WORKSHOP_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    default: {
      throw Error('Unknown action type ' + type);
    }
  }
}
// ==================================
export const WORKSHOP_SET = 'WORKSHOP_SET';
export const WORKSHOP_FETCH_STATUS = 'WORKSHOP_FETCH_STATUS';
export const WORKSHOP_RELATED = 'WORKSHOP_RELATED';
export const WORKSHOP_USER = 'WORKSHOP_USER';
