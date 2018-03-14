import * as signals from './signals';
import * as messages from './messages';
import { combineEpics, select } from 'redux-most';
import { getDelay } from './selectors';
import * as most from 'most';
import * as r from 'ramda';

const mmapc = r.curry(most.map);

export const loaded = (actions$, store) => {
  return r.pipe(
    select(messages.LOADED),
    mmapc(() => {
      const state = store.getState();
      const delayTime = getDelay(state);
      return most.of(messages.destroyed()).delay(delayTime);
    }),
    most.switchLatest,
  )(actions$);
};

export const configure = (actions$) => {
  return r.pipe(
    select(signals.CONFIGURE),
    mmapc(({
      payload,
    }) => messages.configured(payload)),
  )(actions$);
};

export const rootEpic = combineEpics([
  loaded,
  configure,
]);
