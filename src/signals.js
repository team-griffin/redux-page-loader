import { createAction } from 'redux-actions';

// Action Types
const prefix = '@@team-griffin/redux-page-loader/S_';
export const CONFIGURE = `${prefix}CONFIGURE`;
// Actions
export const configure = createAction(CONFIGURE);
