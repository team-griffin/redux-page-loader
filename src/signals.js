import { createAction } from 'redux-actions';

// Action Types
const prefix = '@@TEAM_GRIFFIN/PAGE_LOADER';
export const CONFIGURE = `${prefix}/S_CONFIGURE`;
// Actions
export const configure = createAction(CONFIGURE);
