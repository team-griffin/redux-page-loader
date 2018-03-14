import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import { Provider, connect } from 'react-redux';
import PageGuard from '../src/components/PageGuard';
import ConnectedPageGuard from '../src/components/ConnectedPageGuard';
import middleware from '../src/middleware';
import { REDUCER_MOUNT_POINT } from '../src/constants';
import pageLoaderReducer from '../src/reducer';
import { loaded } from '../src/messages';

const App = () => (<div>App</div>);
const Destroyer = () => (<div>Destroyer</div>);

const injectSPL = () => {
  const oldspl = document.getElementById('spl');
  if(oldspl) {
    oldspl.outerHTML = '';
  }
  const spl = document.createElement('div');
  spl.id = 'spl';
  spl.innerHTML = 'I am the static loader!';
  document.body.appendChild(spl);
};

storiesOf('Page Guard', module)
  .add('loading', () => {
    injectSPL();

    return (
      <div key="loading">
        <PageGuard
          loaded={false}
          destroyed={false}
          renderPage={() => (
            <App/>
          )}
          renderDestroyer={() => (
            <Destroyer/>
          )}
        />
      </div>
    );
  })
  .add('loaded but not destroyed', () => {
    injectSPL();

    return (
      <div key="lbnd">
        <PageGuard
          loaded={true}
          destroyed={false}
          domSelector="#spl"
          renderPage={() => (
            <App/>
          )}
          renderDestroyer={() => (
            <Destroyer/>
          )}
        />
      </div>
    );
  })
  .add('destroyed', () => {
    injectSPL();

    return (
      <div key="destroyed">
        <PageGuard
          loaded={true}
          destroyed={true}
          domSelector="#spl"
          renderPage={() => (
            <App/>
          )}
          renderDestroyer={() => (
            <Destroyer/>
          )}
        />
      </div>
    );
  })
  .add('ebb & flow', () => {
    injectSPL();

    const reducer = combineReducers({
      [REDUCER_MOUNT_POINT]: pageLoaderReducer,
    });

    const store = createStore(
      reducer,
      composeWithDevTools(
        applyMiddleware(
          middleware,
        ),
      )
    );

    return (
      <Provider store={store}>
        <div>
          <div
            style={{
              background: '#eee',
            }}
          >
            <button type="button" onClick={() => { store.dispatch(loaded()) }}>
              Page loaded
            </button>
          </div>
          <ConnectedPageGuard
            renderPage={() => (
              <App/>
            )}
            renderDestroyer={() => (
              <Destroyer/>
            )}
          />
        </div>
      </Provider>
    );
  });