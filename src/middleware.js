import {
  createEpicMiddleware,
  combineEpics,
} from 'redux-most';
import { rootEpic } from './epics';

const middleware = createEpicMiddleware(combineEpics([
  rootEpic,
]));

export default middleware;
