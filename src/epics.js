import * as signals from './signals';
import * as messages from './messages';
import { map } from 'rxjs/operator/map';
import { combineEpics } from 'redux-observable';
import { delay } from 'rxjs/operator/delay';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operator/switchMap';
import { getDelay } from './selectors';

export const loaded = (actions$, store) => {
  return actions$.ofType(messages.LOADED)
    ::switchMap(() => {
      const state = store.getState();
      const delayTime = getDelay(state);

      return of(messages.destroyed())
        ::delay(delayTime);
    })
};

export const configure = (actions$) => {
  return actions$.ofType(signals.CONFIGURE)
    ::map(({ payload }) => {
      return messages.configured(payload);
    });
};

export default combineEpics(
  loaded,
  configure,
);