/* eslint no-use-before-define: 0 */
import 'babel-polyfill';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount, unmount } from 'enzyme';

global.mount = mount;
global.unmount = unmount;
global.shallow = shallow;
global.React = React;
global.sinon = sinon;

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

jest.setTimeout(60000);
global.localStorage = LocalStorageMock;
