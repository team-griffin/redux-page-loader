import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import StaticPageDestroyer from './StaticPageDestroyer';
import {
  setPropTypes,
  setDisplayName,
  compose,
} from 'recompose';
import {
  cond,
  propSatisfies,
  equals,
  always,
  both,
  complement,
  T,
} from 'ramda';

const isLoadedInProps = propSatisfies(equals(true), 'loaded');
const isLoadingInProps = complement(isLoadedInProps);

const isDestroyedInProps = propSatisfies(equals(true), 'destroyed');
const isAliveInProps = complement(isDestroyedInProps);

const renderSPD = ({
  pageComponent,
  domSelector,
  destroyerProps,
}) => (
  <div key="root">
    {createElement(pageComponent, {
      key: 'pageComponent',
    })}
    <StaticPageDestroyer
      key="spd"
      domSelector={domSelector}
      {...destroyerProps}
    />
  </div>
);

const renderPage = ({
  pageComponent,
}) => (
  <div key="root">
    {createElement(pageComponent, {
      key: 'pageComponent',
    })}
  </div>
);

export const PurePageGuard = cond([
  // Do not render anything if the page is still loading
  // This is because we have a static page loader already
  // in the page.
  [ isLoadingInProps, always(null) ],
  [ both(isLoadedInProps, isAliveInProps), renderSPD ],
  [ T, renderPage ],
]);

export const enhance = compose(
  setDisplayName('PageGuard'),
  setPropTypes({
    loaded: PropTypes.boolean,
    destroyed: PropTypes.boolean,
    domSelector: PropTypes.string.isRequired,
    pageComponent: PropTypes.object.isRequired,
    destroyerProps: PropTypes.object.isRequired,
  }),
);

export default enhance(PurePageGuard);
