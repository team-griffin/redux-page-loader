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
    // eslint-disable-next-line fp/no-nil
    componentWillUnmount: function() {
      const {
        dom,
        domSelector,
        // eslint-disable-next-line fp/no-this
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
