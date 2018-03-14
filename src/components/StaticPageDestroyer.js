import React from 'react';
import {
  defaultProps,
  setDisplayName,
  compose,
  lifecycle,
} from 'recompose';
import * as r from 'ramda';

const PureStaticPageDestroyer = ({
  render,
}) => render({});

const enhance = compose(
  setDisplayName('StaticPageDestroyer'),
  defaultProps({
    dom: document,
  }),
  lifecycle({
    componentWillUnmount: function() {
      const {
        dom,
        domSelector,
      } = this.props;
      
      r.pipe(
        r.bind(dom.querySelector, dom),
        r.unless(
          r.isNil,
          r.tap((pageLoader) => pageLoader.parentNode.removeChild(pageLoader)),
        ),
      )(domSelector);
    },
  }),
);

export default enhance(PureStaticPageDestroyer);
