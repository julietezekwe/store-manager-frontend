/* eslint no-use-before-define: 0 */
import 'babel-polyfill';
import React from 'react';
import { shallow, mount } from 'enzyme';

global.mount = mount;
global.shallow = shallow;
global.React = React;

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
global.localStorage = LocalStorageMock;
