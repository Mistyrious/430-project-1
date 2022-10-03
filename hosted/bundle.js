/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/***/ (() => {

eval("const handleResponse = async (response, parseResponse) => {\r\n\r\n    switch (response.status) {\r\n        case 200:\r\n            break;\r\n        case 201:\r\n            break\r\n        case 204:\r\n            break;\r\n        case 400:\r\n            break;\r\n        case 404:\r\n            break;\r\n        default:\r\n            break;\r\n    }\r\n\r\n    if (parseResponse) {\r\n        const obj = await response.json();\r\n        if (obj.message) {\r\n          \r\n        } else if (obj.tierlists) {\r\n        }\r\n    }\r\n};\r\n\r\nconst updateCategories = (categories) => {\r\n    categoriesSelect = document.querySelector('listCategory');\r\n\r\n    categories.listNames.forEach = (category) =>{\r\n        const newValue = `<option value=\"${category}\">${category}</option>`;\r\n        categoriesSelect.innerHTML += newValue;\r\n    }\r\n\r\n}\r\n\r\nconst requestCategories = async (choiceForm) => {\r\n    const categories = choiceForm.querySelector('#listCategory');\r\n    const selectedCategory = categories.value;\r\n    let url = selectedCategory ? `/getLists?category=${selectedCategory}` : '/getLists';\r\n\r\n    const response = await fetch(url, {\r\n      method,\r\n      headers: {\r\n        'Accept': 'application/json',\r\n      },\r\n    });\r\n\r\n    updateCategories(response);\r\n};\r\n\r\nconst sendPost = async (form, responseHandler) => {\r\n\r\n}\r\n\r\nconst init = () => {\r\n    const listSelection = document.querySelector('#listChoiceForm');\r\n    const listCategory = document.querySelector('#listCategory');\r\n    const listCreation = document.querySelector('#listCreation');\r\n\r\n    listCategory.addEventListener('change', (e) => {\r\n        requestCategories(listSelection);\r\n    });\r\n\r\n    listSelection.addEventListener('submit', (e) => {\r\n        e.preventDefault();\r\n        sendPost(listSelection);\r\n        return false;\r\n    });\r\n\r\n    listCreation.addEventListener('submit', (e) => {\r\n        e.preventDefault();\r\n        sendPost(listCreation);\r\n        return false;\r\n    });\r\n\r\n    requestCategories(listSelection);\r\n}\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430-project-1/./client/client.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/client.js"]();
/******/ 	
/******/ })()
;