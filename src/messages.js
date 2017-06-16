import { createAction } from 'redux-actions';

// Action Types
const prefix = '@@TEAM_GRIFFIN/PAGE_LOADER';
export const DESTROYED = `${prefix}/M_DESTROYED`;
export const LOADED = `${prefix}/M_LOADED`;
export const CONFIGURED = `${prefix}/M_CONFIGURED`;
// Actions
export const destroyed = createAction(DESTROYED);
export const loaded = createAction(LOADED);
export const configured = createAction(CONFIGURED);