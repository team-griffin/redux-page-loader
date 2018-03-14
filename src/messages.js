import { createAction } from 'redux-actions';

// Action Types
const prefix = '@@team-griffin/redux-page-loader/M_';
export const DESTROYED = `${prefix}DESTROYED`;
export const LOADED = `${prefix}LOADED`;
export const CONFIGURED = `${prefix}CONFIGURED`;
// Actions
export const destroyed = createAction(DESTROYED);
export const loaded = createAction(LOADED);
export const configured = createAction(CONFIGURED);