import { createSelector } from 'reselect';
import * as r from 'ramda';
import { REDUCER_MOUNT_POINT } from './constants';

export const getPageLoader = r.prop(REDUCER_MOUNT_POINT);

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
