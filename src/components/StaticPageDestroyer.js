import React, { Component, PropTypes, createElement } from 'react';

class StaticPageDestroyer extends Component {
  static defaultProps = {
    dom: document,
  };

  static propTypes = {
    dom: PropTypes.object,
    domSelector: PropTypes.string.isRequired,
  };

  componentWillUnmount() {
    const pageLoader = this.props.dom.querySelector(this.props.domSelector);
    if (pageLoader != null) {
      pageLoader.parentNode.removeChild(pageLoader);
    }
  }

  render() {
    const {
      component,
      ...rest,
    } = this.props;

    return createElement(component, {
      ...rest,
    });
  }
}

export default StaticPageDestroyer;
