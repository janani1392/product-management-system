"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("../../../styles");

var _productService = require("../productService");

var ProductList = function ProductList() {
  var _useState = (0, _react.useState)([]);

  var _useState2 = _slicedToArray(_useState, 2);

  var products = _useState2[0];
  var setProducts = _useState2[1];

  var _useState3 = (0, _react.useState)("price");

  var _useState32 = _slicedToArray(_useState3, 2);

  var sortBy = _useState32[0];
  var setSortBy = _useState32[1];

  var _useState4 = (0, _react.useState)("asc");

  var _useState42 = _slicedToArray(_useState4, 2);

  var direction = _useState42[0];
  var setDirection = _useState42[1];

  var _useState5 = (0, _react.useState)(0);

  var _useState52 = _slicedToArray(_useState5, 2);

  var currentPage = _useState52[0];
  var setCurrentPage = _useState52[1];

  var _useState6 = (0, _react.useState)("");

  var _useState62 = _slicedToArray(_useState6, 2);

  var searchKeyword = _useState62[0];
  var setSearchKeyword = _useState62[1];

  var _useState7 = (0, _react.useState)(false);

  var _useState72 = _slicedToArray(_useState7, 2);

  var loading = _useState72[0];
  var setLoading = _useState72[1];

  var _useState8 = (0, _react.useState)(10);

  var _useState82 = _slicedToArray(_useState8, 2);

  var pageSize = _useState82[0];
  var setPageSize = _useState82[1];

  var _useState9 = (0, _react.useState)(0);

  var _useState92 = _slicedToArray(_useState9, 2);

  var totalProducts = _useState92[0];
  var setTotalProducts = _useState92[1];

  var fetchData = (0, _react.useCallback)(function () {
    setLoading(true);
    var sort = sortBy + "," + direction;
    (0, _productService.fetchProducts)(currentPage, pageSize, sort, searchKeyword).then(function (responseData) {
      if (responseData) {
        setProducts(responseData.content || []);
        setTotalProducts(responseData.totalElements || 0);
      } else {
        setProducts([]);
        setTotalProducts(0);
      }
      setLoading(false);
    })["catch"](function (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    });
  }, [currentPage, pageSize, sortBy, direction, searchKeyword]);

  (0, _react.useEffect)(function () {
    fetchData();
  }, [fetchData]);

  (0, _react.useEffect)(function () {
    setCurrentPage(0);
  }, [sortBy, direction, searchKeyword]);

  return _react2["default"].createElement(
    _styles.PageContainer,
    null,
    _react2["default"].createElement(
      "h1",
      null,
      "Product List"
    ),
    _react2["default"].createElement(
      _styles.Content,
      null,
      _react2["default"].createElement(
        "div",
        null,
        _react2["default"].createElement(
          "label",
          { htmlFor: "searchKeyword" },
          "Search:"
        ),
        _react2["default"].createElement("input", {
          type: "text",
          id: "searchKeyword",
          name: "searchKeyword",
          value: searchKeyword,
          onChange: function (e) {
            return setSearchKeyword(e.target.value);
          },
          placeholder: "Search products..."
        }),
        _react2["default"].createElement(
          "button",
          { onClick: fetchData },
          "Search"
        )
      ),
      _react2["default"].createElement(
        "div",
        null,
        _react2["default"].createElement(
          "label",
          { htmlFor: "pageSize" },
          "Items per page:"
        ),
        _react2["default"].createElement(
          "select",
          {
            id: "pageSize",
            name: "pageSize",
            value: pageSize,
            onChange: function (e) {
              setPageSize(Number(e.target.value));
              setCurrentPage(0);
            }
          },
          _react2["default"].createElement(
            "option",
            { value: "10" },
            "10"
          ),
          _react2["default"].createElement(
            "option",
            { value: "20" },
            "20"
          ),
          _react2["default"].createElement(
            "option",
            { value: "50" },
            "50"
          )
        )
      ),
      _react2["default"].createElement(
        "div",
        null,
        _react2["default"].createElement(
          "p",
          null,
          totalProducts > 0 ? "Showing " + (currentPage * pageSize + 1) + " to " + Math.min((currentPage + 1) * pageSize, totalProducts) + " of " + totalProducts + " products" : "No products found."
        )
      ),
      _react2["default"].createElement(
        "div",
        null,
        _react2["default"].createElement(
          "label",
          { htmlFor: "sortBy" },
          "Sort By:"
        ),
        _react2["default"].createElement(
          "select",
          {
            id: "sortBy",
            name: "sortBy",
            value: sortBy,
            onChange: function (e) {
              return setSortBy(e.target.value);
            }
          },
          _react2["default"].createElement(
            "option",
            { value: "price" },
            "Price"
          ),
          _react2["default"].createElement(
            "option",
            { value: "name" },
            "Name"
          ),
          _react2["default"].createElement(
            "option",
            { value: "category" },
            "Category"
          )
        ),
        _react2["default"].createElement(
          "select",
          {
            value: direction,
            onChange: function (e) {
              return setDirection(e.target.value);
            }
          },
          _react2["default"].createElement(
            "option",
            { value: "asc" },
            "Ascending"
          ),
          _react2["default"].createElement(
            "option",
            { value: "desc" },
            "Descending"
          )
        )
      ),
      loading ? _react2["default"].createElement(
        "p",
        null,
        "Loading..."
      ) : products.length > 0 ? _react2["default"].createElement(
        "ul",
        null,
        products.map(function (product) {
          return _react2["default"].createElement(
            "li",
            { key: product.id },
            _react2["default"].createElement(
              "strong",
              null,
              product.name
            ),
            " - $",
            product.price,
            " (",
            product.category,
            ")"
          );
        })
      ) : _react2["default"].createElement(
        "p",
        null,
        "No products found. Please try a different search or sort criteria."
      ),
      _react2["default"].createElement(
        "div",
        null,
        _react2["default"].createElement(
          "button",
          {
            onClick: function () {
              return setCurrentPage(function (prev) {
                return Math.max(prev - 1, 0);
              });
            },
            disabled: currentPage === 0
          },
          "Previous"
        ),
        _react2["default"].createElement(
          "button",
          {
            onClick: function () {
              return setCurrentPage(function (prev) {
                return prev + 1;
              });
            },
            disabled: (currentPage + 1) * pageSize >= totalProducts
          },
          "Next"
        )
      )
    )
  );
};

exports["default"] = ProductList;
module.exports = exports["default"];
/* Search Section */ /* Items Per Page Section */ /* Page Info */ /* Sorting Section */ /* Product List */ /* Pagination Buttons */