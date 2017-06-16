import ConnectedPageGuard from './components/ConnectedPageGuard';
import reducer from './reducer';
import * as messages from './messages';
import * as signals from './signals';
import * as selectors from './selectors';
import * as epics from './epics';

export {
  ConnectedPageGuard as PageGuard,
  messages,
  signals,
  selectors,
  reducer,
};

export const epic = epics.rootEpic;