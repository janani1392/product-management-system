"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("../../../styles");

function About() {
  return _react2["default"].createElement(
    _styles.PageContainer,
    null,
    _react2["default"].createElement(
      _styles.Content,
      null,
      _react2["default"].createElement(
        "h2",
        null,
        "About This App"
      ),
      _react2["default"].createElement(
        "p",
        null,
        "This app demonstrates how to use React Router for navigation. You can navigate between pages without refreshing the browser!"
      ),
      _react2["default"].createElement(
        "p",
        null,
        "It’s built using React and styled-components for styling."
      )
    )
  );
}

exports["default"] = About;
module.exports = exports["default"];