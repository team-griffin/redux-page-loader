import ConnectedPageGuard from './components/ConnectedPageGuard';
import reducer from './reducer';
import * as messages from './messages';
import * as signals from './signals';
import * as selectors from './selectors';
import epics from './epics';

export {
  ConnectedPageGuard as PageGuard,
  epics,
  messages,
  signals,
  selectors,
  reducer,
};