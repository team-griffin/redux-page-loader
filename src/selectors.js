import { createSelector } from 'reselect';

export const getPageLoader = (state) => {
  return state.pageLoader;
};

export const isLoaded = createSelector(
  getPageLoader,
  (pageLoader) => {
    return pageLoader.get('loaded');
  }
);

export const isDestroyed = createSelector(
  getPageLoader,
  (pageLoader) => {
    return pageLoader.get('destroyed');
  }
);

export const getDelay = createSelector(
  getPageLoader,
  (pageLoader) => {
    return pageLoader.get('delay');
  }
);