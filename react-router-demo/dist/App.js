'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _styles = require('./styles');

// Import styled components

var _featuresProductsPagesHome = require('./features/Products/pages/Home');

var _featuresProductsPagesHome2 = _interopRequireDefault(_featuresProductsPagesHome);

var _featuresProductsPagesAbout = require('./features/Products/pages/About');

var _featuresProductsPagesAbout2 = _interopRequireDefault(_featuresProductsPagesAbout);

var _featuresProductsPagesServices = require('./features/Products/pages/Services');

var _featuresProductsPagesServices2 = _interopRequireDefault(_featuresProductsPagesServices);

var _featuresProductsPagesServicesWebDevelopment = require('./features/Products/pages/services/WebDevelopment');

var _featuresProductsPagesServicesWebDevelopment2 = _interopRequireDefault(_featuresProductsPagesServicesWebDevelopment);

var _featuresProductsPagesServicesAppDevelopment = require('./features/Products/pages/services/AppDevelopment');

var _featuresProductsPagesServicesAppDevelopment2 = _interopRequireDefault(_featuresProductsPagesServicesAppDevelopment);

var _featuresProductsComponentsProductList = require('./features/Products/components/ProductList');

var _featuresProductsComponentsProductList2 = _interopRequireDefault(_featuresProductsComponentsProductList);

// Updated imp

var App = function App() {
    return _react2['default'].createElement(
        _styles.AppContainer,
        null,
        _react2['default'].createElement(
            _styles.Title,
            null,
            'Welcome to My React Router Demo'
        ),
        _react2['default'].createElement(
            _styles.NavBar,
            null,
            _react2['default'].createElement(
                'ul',
                null,
                _react2['default'].createElement(
                    'li',
                    null,
                    _react2['default'].createElement(
                        _reactRouterDom.Link,
                        { to: '/' },
                        'Home'
                    )
                ),
                _react2['default'].createElement(
                    'li',
                    null,
                    _react2['default'].createElement(
                        _reactRouterDom.Link,
                        { to: '/about' },
                        'About'
                    )
                ),
                _react2['default'].createElement(
                    'li',
                    null,
                    _react2['default'].createElement(
                        _reactRouterDom.Link,
                        { to: '/services' },
                        'Services'
                    )
                ),
                _react2['default'].createElement(
                    'li',
                    null,
                    _react2['default'].createElement(
                        _reactRouterDom.Link,
                        { to: '/products' },
                        'Products'
                    )
                )
            )
        ),
        _react2['default'].createElement(
            _reactRouterDom.Routes,
            null,
            _react2['default'].createElement(_reactRouterDom.Route, { path: '/', element: _react2['default'].createElement(_featuresProductsPagesHome2['default'], null) }),
            _react2['default'].createElement(_reactRouterDom.Route, { path: '/about', element: _react2['default'].createElement(_featuresProductsPagesAbout2['default'], null) }),
            _react2['default'].createElement(
                _reactRouterDom.Route,
                { path: '/services', element: _react2['default'].createElement(_featuresProductsPagesServices2['default'], null) },
                _react2['default'].createElement(_reactRouterDom.Route, { path: 'web-development', element: _react2['default'].createElement(_featuresProductsPagesServicesWebDevelopment2['default'], null) }),
                _react2['default'].createElement(_reactRouterDom.Route, { path: 'app-development', element: _react2['default'].createElement(_featuresProductsPagesServicesAppDevelopment2['default'], null) })
            ),
            _react2['default'].createElement(_reactRouterDom.Route, { path: '/products', element: _react2['default'].createElement(_featuresProductsComponentsProductList2['default'], null) })
        )
    );
};

exports['default'] = App;
module.exports = exports['default'];
/* Styled NavBar */ /* Routes */