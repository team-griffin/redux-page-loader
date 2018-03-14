import PageGuard from './PageGuard';
import { connect } from 'react-redux';
import {
  isDestroyed,
  isLoaded,
  getPageLoader,
} from '../selectors';
import {
  compose,
} from 'recompose';

const mapStateToProps = (state) => {
  return {
    destroyed: isDestroyed(state),
    loaded: isLoaded(state),
    domSelector: getPageLoader(state).domSelector,
  };
};

const mapDispatchToProps = void 0;
const mergeProps = void 0;

export const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
);

export default enhance(PageGuard);
