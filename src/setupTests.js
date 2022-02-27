// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import Mockdate from "mockdate"

const mockdateInit = 1645985898285 // 2020-02-04T02:22:40

global.beforeEach(() => {
  Mockdate.set(mockdateInit)
});
