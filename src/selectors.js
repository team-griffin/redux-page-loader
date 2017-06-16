import { createSelector } from 'reselect';
import * as r from 'ramda';

export const getPageLoader = r.prop('pageLoader');

export const isLoaded = createSelector(
  getPageLoader,
  r.prop('loaded'),
);

export const isDestroyed = createSelector(
  getPageLoader,
  r.prop('destroyed'),
);

export const getDelay = createSelector(
  getPageLoader,
  r.prop('delay'),
);
