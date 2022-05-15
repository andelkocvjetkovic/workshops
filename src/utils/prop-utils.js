import * as R from 'ramda';

// getTitle :: Object -> String
export const getTitle = R.prop('title');

// getId :: Object -> String
export const getId = R.prop('id');

// getImageUrl :: Object -> String
export const getImageUrl = R.prop('imageUrl');

// getDate :: Object -> String
export const getDate = R.prop('date');

// getCategory :: Object -> String
export const getCategory = R.prop('category');

// getName :: Object -> String
export const getName = R.prop('name');

// getDesc :: Object -> String
export const getDesc = R.prop('desc');

// getPrice :: Object -> String
export const getPrice = R.prop('price');
