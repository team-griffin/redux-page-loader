import { createReducer } from 'redux-create-reducer';
import * as messages from './messages';
import * as r from 'ramda';

export const initialState = {
  loaded: false,
  destroyed: false,
  delay: 2000,
  domSelector: '.page-loader',
};

export default createReducer(initialState, {
  [messages.CONFIGURED]: (state, {
    payload,
  }) => r.merge(
    state,
    {
      delay: payload.delay,
      domSelector: payload.domSelector,
    }
  ),
  [messages.LOADED]: r.assoc('loaded', true),
  [messages.DESTROYED]: r.assoc('destroyed', true),
});
