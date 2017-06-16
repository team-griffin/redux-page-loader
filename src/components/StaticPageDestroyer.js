import { createElement } from 'react';
import PropTypes from 'prop-types';
import {
  defaultProps,
  setDisplayName,
  compose,
  setPropTypes,
  lifecycle,
} from 'recompose';

const PureStaticPageDestroyer = ({
  component,
  ...rest,
}) => createElement(component, {
  ...rest,
});

const enhance = compose(
  setDisplayName('StaticPageDestroyer'),
  setPropTypes({
    dom: PropTypes.object,
    domSelector: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,    
  }),
  defaultProps({
    dom: document,
  }),
  lifecycle({
    componentWillUnmount: function() {
      const pageLoader = this.props.dom.querySelector(this.props.domSelector);
      if (pageLoader != null) {
        pageLoader.parentNode.removeChild(pageLoader);
      }      
    }
  }),
);

export default enhance(PureStaticPageDestroyer);
