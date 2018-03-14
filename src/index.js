import ConnectedPageGuard from './components/ConnectedPageGuard';
import reducer from './reducer';
import * as messages from './messages';
import * as signals from './signals';
import * as selectors from './selectors';
import * as epics from './epics';
import middleware from './middleware';

export {
  ConnectedPageGuard as PageGuard,
  messages,
  signals,
  selectors,
  reducer,
  middleware,
};

export const epic = epics.rootEpic;