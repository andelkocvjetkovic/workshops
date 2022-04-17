/**
 * Enum for fetch status
 * @readonly
 * @enum {{LOADING: string, IDLE: string, ERROR: string}}
 */
export const FETCH_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
};
/**
 * Filters for  workshops
 * @readonly
 * @enum {{FRONTEND: string, ALL: string, DESIGN: string, MARKETING: string, BACKEND: string}} filter
 */
export const FILTERS = {
  ALL: 'all',
  DESIGN: 'design',
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  MARKETING: 'marketing',
};

/**
 * @namespace Workshop
 */
/**
 * Workshop order object types
 * @typedef Workshop~OrderProduct
 * @property {number} id
 * @property {string} title
 * @property {string} desc
 * @property {number} price
 * @property {string} date
 * @property {string} category
 * @property {string} imageUrl
 * @property {number} quantity
 */
