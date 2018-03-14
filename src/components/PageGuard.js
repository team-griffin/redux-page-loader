import React, {
  Fragment,
} from 'react';
import StaticPageDestroyer from './StaticPageDestroyer';
import {
  setDisplayName,
  compose,
} from 'recompose';
import * as r from 'ramda';

const isLoadedInProps = r.propSatisfies(r.equals(true), 'loaded');
const isLoadingInProps = r.complement(isLoadedInProps);

const isDestroyedInProps = r.propSatisfies(r.equals(true), 'destroyed');
const isAliveInProps = r.complement(isDestroyedInProps);

const renderSPD = ({
  destroyed,
  loaded,
  domSelector,
  renderPage,
  renderDestroyer,
}) => (
  <Fragment key="root">
    {renderPage({
      destroyed,
      loaded,
    })}
    <StaticPageDestroyer
      key="spd"
      domSelector={domSelector}
      render={renderDestroyer}
    />
  </Fragment>
);

const renderWrappingPage = ({
  destroyed,
  loaded,
  renderPage,
}) => (
  <Fragment key="root">
    {renderPage({
      destroyed,
      loaded,
    })}
  </Fragment>
);

export const PurePageGuard = r.cond([
  // Do not render anything if the page is still loading
  // This is because we have a static page loader already
  // in the page.
  // eslint-disable-next-line fp/no-nil
  [ isLoadingInProps, r.always(null) ],
  [ r.both(isLoadedInProps, isAliveInProps), renderSPD ],
  [ r.T, renderWrappingPage ],
]);

export const enhance = compose(
  setDisplayName('PageGuard'),
);

export default enhance(PurePageGuard);
