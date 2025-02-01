'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var Services = function Services() {
    return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
            'h1',
            null,
            'Our Services'
        ),
        _react2['default'].createElement(
            'nav',
            null,
            _react2['default'].createElement(
                _reactRouterDom.Link,
                { to: 'web-development' },
                'Web Development'
            ),
            ' |',
            ' ',
            _react2['default'].createElement(
                _reactRouterDom.Link,
                { to: 'app-development' },
                'App Development'
            )
        ),
        _react2['default'].createElement('hr', null),
        _react2['default'].createElement(_reactRouterDom.Outlet, null)
    );
};

exports['default'] = Services;
module.exports = exports['default'];