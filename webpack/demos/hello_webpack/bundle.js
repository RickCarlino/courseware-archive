/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Calc = __webpack_require__(1);

	document.write("<h1>Calculator Module Tester</h1>")
	document.write("Calc.add(2, 2) = " + Calc.add(2, 2) + "<br>");
	document.write("Calc.random() =" + Calc.random() + "<br>");


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  add: __webpack_require__(2),
	  random: __webpack_require__(3)
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(lhand, rhand) {
	  return lhand + rhand;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	function random()  {
	  var float = Math.random() * 1000;
	  return Math.round(float);
	}

	module.exports = random


/***/ }
/******/ ]);