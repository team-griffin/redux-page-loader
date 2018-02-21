import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import {
  withState,
  createSink,
  compose,
  lifecycle,
} from 'recompose';

import { PurePageGuard, enhance } from '../PageGuard';
import StaticPageDestroyer from '../StaticPageDestroyer';

configure({ adapter: new Adapter() });

describe('<PurePageGuard/>', function(){
  context('when loading', function(){
    it('renders null', function () {
      const wrapper = shallow(
        <PurePageGuard
          loaded={false}
          destroyed={false}
          domSelector=".page-loader"
          destroyerProps={{}}
        />
      );

      expect(wrapper.html()).to.equal(null);
    });
  });
  context('when loaded', function(){
    it('renders a static page destroyer', function () {
      const wrapper = shallow(
        <PurePageGuard
          loaded={true}
          destroyed={false}
          domSelector=".page-loader"
          destroyerProps={{}}
          pageComponent={() => null}
        />
      );

      expect(wrapper.find(StaticPageDestroyer)).to.have.length(1);
    });
    it('renders the page component behind the destroyer', function () {
      const Component = () => (<div/>);
      const wrapper = shallow(
        <PurePageGuard
          loaded={true}
          destroyed={false}
          domSelector=".page-loader"
          destroyerProps={{}}
          pageComponent={Component}
        />
      );

      expect(wrapper.find(Component)).to.have.length(1);
    });
  });
  context('when destroyed', function(){
    it('renders the page', function () {
      const Component = () => (<div/>);
      const wrapper = shallow(
        <PurePageGuard
          loaded={true}
          destroyed={true}
          domSelector=".page-loader"
          destroyerProps={{}}
          pageComponent={Component}
        />
      );

      expect(wrapper.find(StaticPageDestroyer)).to.have.length(0);
      expect(wrapper.find(Component)).to.have.length(1);
    });
    it('clones the page', function () {
      const Component = () => (<div/>);
      const wrapper = shallow(
        <PurePageGuard
          loaded={true}
          destroyed={true}
          domSelector=".page-loader"
          destroyerProps={{}}
          pageComponent={<Component/>}
        />
      );

      expect(wrapper.find(Component)).to.have.length(1);
    });
  });
});

describe('enhance', function(){
  it('renders the pure component', function(done){
    const Pure = createSink(() => {
      done();
    });
    const Enhanced = enhance(Pure);

    mount(<Enhanced/>);
  });
});
