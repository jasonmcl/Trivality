webpackJsonp([2],{

/***/ "./src/components/utility/layoutContent.js":
/*!*************************************************!*\
  !*** ./src/components/utility/layoutContent.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layoutContent_style__ = __webpack_require__(/*! ./layoutContent.style */ "./src/components/utility/layoutContent.style.js");


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__layoutContent_style__["a" /* default */]);

/***/ }),

/***/ "./src/components/utility/layoutContent.style.js":
/*!*******************************************************!*\
  !*** ./src/components/utility/layoutContent.style.js ***!
  \*******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_components__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.es.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_theme__ = __webpack_require__(/*! styled-theme */ "./node_modules/styled-theme/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_styled_theme___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_styled_theme__);
var _templateObject = _taggedTemplateLiteral(['\n  width: 100%;\n  padding: 35px;\n  background-color: #ffffff;\n  border: 1px solid ', ';\n  height: 100%;\n'], ['\n  width: 100%;\n  padding: 35px;\n  background-color: #ffffff;\n  border: 1px solid ', ';\n  height: 100%;\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var LayoutContentStyle = __WEBPACK_IMPORTED_MODULE_0_styled_components__["b" /* default */].div(_templateObject, Object(__WEBPACK_IMPORTED_MODULE_1_styled_theme__["palette"])('border', 0));

/* harmony default export */ __webpack_exports__["a"] = (LayoutContentStyle);

/***/ }),

/***/ "./src/components/utility/layoutWrapper.js":
/*!*************************************************!*\
  !*** ./src/components/utility/layoutWrapper.js ***!
  \*************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__layoutWrapper_style__ = __webpack_require__(/*! ./layoutWrapper.style */ "./src/components/utility/layoutWrapper.style.js");
var _jsxFileName = 'C:\\MyProjects\\Repos\\Trivality\\Trivality.Web\\app\\src\\components\\utility\\layoutWrapper.js',
    _this = this;




/* harmony default export */ __webpack_exports__["a"] = (function (props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_1__layoutWrapper_style__["a" /* LayoutContentWrapper */],
    Object.assign({
      className: props.className != null ? props.className + ' isoLayoutContentWrapper' : 'isoLayoutContentWrapper'
    }, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 5
      },
      __self: _this
    }),
    props.children
  );
});

/***/ }),

/***/ "./src/components/utility/layoutWrapper.style.js":
/*!*******************************************************!*\
  !*** ./src/components/utility/layoutWrapper.style.js ***!
  \*******************************************************/
/*! exports provided: LayoutContentWrapper */
/*! exports used: LayoutContentWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayoutContentWrapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_styled_components__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.es.js");
var _templateObject = _taggedTemplateLiteral(['\n  padding: 50px 20px;\n  display: flex;\n  flex-flow: row wrap;\n  overflow: hidden;\n\n  @media only screen and (max-width: 767px) {\n    padding: 50px 20px;\n  }\n\n  @media (max-width: 580px) {\n    padding: 15px;\n  }\n'], ['\n  padding: 50px 20px;\n  display: flex;\n  flex-flow: row wrap;\n  overflow: hidden;\n\n  @media only screen and (max-width: 767px) {\n    padding: 50px 20px;\n  }\n\n  @media (max-width: 580px) {\n    padding: 15px;\n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var LayoutContentWrapper = __WEBPACK_IMPORTED_MODULE_0_styled_components__["b" /* default */].div(_templateObject);



/***/ }),

/***/ "./src/containers/blankPage.js":
/*!*************************************!*\
  !*** ./src/containers/blankPage.js ***!
  \*************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_utility_layoutWrapper__ = __webpack_require__(/*! ../components/utility/layoutWrapper */ "./src/components/utility/layoutWrapper.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_utility_layoutContent__ = __webpack_require__(/*! ../components/utility/layoutContent */ "./src/components/utility/layoutContent.js");
var _jsxFileName = 'C:\\MyProjects\\Repos\\Trivality\\Trivality.Web\\app\\src\\containers\\blankPage.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1__components_utility_layoutWrapper__["a" /* default */],
        { style: { height: '100vh' }, __source: {
            fileName: _jsxFileName,
            lineNumber: 8
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2__components_utility_layoutContent__["a" /* default */],
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 9
            },
            __self: this
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h1',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 10
              },
              __self: this
            },
            'Blank Page'
          )
        )
      );
    }
  }]);

  return _class;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (_class);

/***/ })

});
//# sourceMappingURL=2.chunk.js.map