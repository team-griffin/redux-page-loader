import React, {
  createElement,
  cloneElement,
  isValidElement,
} from 'react';
import StaticPageDestroyer from './StaticPageDestroyer';
import {
  setDisplayName,
  shouldUpdate,
  compose,
} from 'recompose';
import {
  cond,
  propSatisfies,
  equals,
  always,
  both,
  complement,
  pipe,
  omit,
  lensProp,
  over,
  ifElse,
  T,
} from 'ramda';

const isLoadedInProps = propSatisfies(equals(true), 'loaded');
const isLoadingInProps = complement(isLoadedInProps);

const isDestroyedInProps = propSatisfies(equals(true), 'destroyed');
const isAliveInProps = complement(isDestroyedInProps);

const createOrClone = ifElse(
  isValidElement,
  (Component) => cloneElement(Component, { key: 'pageComponent' }),
  (Component) => createElement(Component, { key: 'pageComponent' }),
);

const renderSPD = ({
  pageComponent,
  domSelector,
  destroyerProps,
}) => (
  <div key="root">
    {createOrClone(pageComponent)}
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
    {createOrClone(pageComponent)}
  </div>
);

export const PurePageGuard = cond([
  // Do not render anything if the page is still loading
  // This is because we have a static page loader already
  // in the page.
  // eslint-disable-next-line fp/no-nil
  [ isLoadingInProps, always(null) ],
  [ both(isLoadedInProps, isAliveInProps), renderSPD ],
  [ T, renderPage ],
]);

export const enhance = compose(
  setDisplayName('PageGuard'),
  shouldUpdate((prevProps, nextProps) => {
    const getRelevantProps = pipe(
      omit([ 'pageComponent' ]),
      over(
        lensProp('destroyerProps'),
        omit([ 'component' ]),
      ),
    );

    const isSame = equals(
      getRelevantProps(prevProps),
      getRelevantProps(nextProps),
    );

    return isSame === false;
  }),
);

export default enhance(PurePageGuard);
