import React, { PropTypes, createElement } from 'react';
import StaticPageDestroyer from './StaticPageDestroyer';
import { connect } from 'react-redux';
import { isDestroyed, isLoaded, getPageLoader } from '../selectors';

const PageGuard = (props) => {
  const {
    loaded,
    destroyed,
    domSelector,
    pageComponent,
    destroyerProps,
  } = props;

  if (loaded === false) {
    // Do not render anything if the page is still loading
    // This is because we have a static page loader already
    // in the page.
    return null;
  }

  if (loaded === true && destroyed === false) {
    return (
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
  }

  return (
    <div key="root">
      {createElement(pageComponent, {
        key: 'pageComponent',
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    destroyed: isDestroyed(state),
    loaded: isLoaded(state),
    domSelector: getPageLoader(state).get('domSelector'),
  };
};

const mapDispatchToProps = void 0;
const mergeProps = void 0;

export const PureComponent = PageGuard;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PageGuard);