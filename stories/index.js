import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PageGuard from '../src/components/PageGuard';

const App = () => (<div>App</div>);
const Destroyer = () => (<div>Destroyer</div>);

const injectSPL = () => {
  const oldspl = document.getElementById('spl');
  if(oldspl) {
    oldspl.outerHTML = '';
  }
  const spl = document.createElement('div');
  spl.id = 'spl';
  spl.innerHTML = 'hello';
  document.body.appendChild(spl);
};

storiesOf('Page Guard', module)
  .add('loading', () => {
    injectSPL();

    return (
      <PageGuard
        loaded={false}
        destroyed={false}
        pageComponent={() => {
          return (
            <App/>
          );
        }}
        destroyerProps={{
          component: Destroyer,
        }}
      />
    );
  })
  .add('loaded but not destroyed', () => {
    injectSPL();

    return (
      <PageGuard
        loaded={true}
        destroyed={false}
        pageComponent={() => {
          return (
            <App/>
          );
        }}
        destroyerProps={{
          component: Destroyer,
        }}
      />
    );
  })
  .add('destroyed', () => {
    injectSPL();

    return (
      <PageGuard
        loaded={true}
        destroyed={true}
        domSelector={'#spl'}
        pageComponent={() => {
          return (
            <App/>
          );
        }}
        destroyerProps={{
          component: Destroyer,
        }}
      />
    );
  });