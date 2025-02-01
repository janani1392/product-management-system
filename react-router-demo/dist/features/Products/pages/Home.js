"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("../../../styles");

function Home() {
  return _react2["default"].createElement(
    _styles.PageContainer,
    null,
    _react2["default"].createElement(
      _styles.Content,
      null,
      _react2["default"].createElement(
        "h2",
        null,
        "Welcome to the React Router Demo!"
      ),
      _react2["default"].createElement(
        "p",
        null,
        "This is the Home page where you can learn about routing in React. Feel free to explore!"
      )
    )
  );
}

exports["default"] = Home;
module.exports = exports["default"];