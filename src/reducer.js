import { createReducer } from 'redux-create-reducer';
import { Map } from 'immutable';
import * as messages from './messages';

export const initialState = Map({
  loaded: false,
  destroyed: false,
  delay: 2000,
  domSelector: '.page-loader',
});

export default createReducer(initialState, {
  [messages.LOADED]: (state) => {
    return state.merge({
      loaded: true,
    });
  },
  [messages.DESTROYED]: (state) => {
    return state.merge({
      destroyed: true,
    });
  },
  [messages.CONFIGURED]: (state, { payload }) => {
    return state.merge({
      delay: payload.delay,
      domSelector: payload.domSelector,
    });
  },
});