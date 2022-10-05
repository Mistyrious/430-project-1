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

eval("const handleResponse = async (response, parseResponse) => {\r\n\r\n    switch (response.status) {\r\n        case 200:\r\n            break;\r\n        case 201:\r\n            break\r\n        case 204:\r\n            break;\r\n        case 400:\r\n            break;\r\n        case 404:\r\n            break;\r\n        default:\r\n            break;\r\n    }\r\n\r\n    if (parseResponse) {\r\n        const obj = await response.json();\r\n        if (obj.message) {\r\n\r\n        } else if (obj.tierlists) {}\r\n    }\r\n};\r\n\r\nconst displaySelects = (listData) => {\r\n    const categorySelect = document.querySelector('#listCategory');\r\n    const listSelect = document.querySelector('#listSelect');\r\n\r\n    if (categorySelect.innerHTML === \"\") {\r\n        const emptyValue = document.createElement('option');\r\n        emptyValue.value = \"\";\r\n        emptyValue.innerHTML = \"\";\r\n        categorySelect.appendChild(emptyValue);\r\n        listData.listCategories.forEach((category) => {\r\n            const newValue = document.createElement('option');\r\n            newValue.value - category;\r\n            newValue.innerHTML = category;\r\n            categorySelect.appendChild(newValue);\r\n        });\r\n    }\r\n\r\n    listSelect.innerHTML = \"\";\r\n\r\n    listData.listNames.forEach((name) => {\r\n        const newValue = `<option value=\"${name}\">${name}</option>`;\r\n        listSelect.innerHTML += newValue;\r\n    });\r\n}\r\n\r\n\r\nconst sendPost = async (url, body, responseHandler) => {\r\n\r\n    const response = await fetch(url, {\r\n        method: nameMethod,\r\n        headers: {\r\n          'Accept': 'application/json',\r\n          'Content-Type': 'application/x-www-form-urlencoded',\r\n        },\r\n        'body': body,\r\n    })\r\n\r\n      responseHandler(response);\r\n}\r\n\r\nconst sendGet = async(url, responseHandler) => {\r\n    const response = await fetch(url, {\r\n        method: 'GET',\r\n        headers: {\r\n            'Accept': 'application/json',\r\n        },\r\n    });\r\n\r\n    const data = await response.json();\r\n\r\n    return responseHandler(data);\r\n}\r\n\r\nconst init = () => {\r\n    const listSelection = document.querySelector('#listChoiceForm');\r\n    const listCategory = document.querySelector('#listCategory');\r\n    const listCreation = document.querySelector('#listCreation');\r\n    const listRanker = document.querySelector('#listCreation');\r\n\r\n    listCategory.addEventListener('change', (e) => {\r\n        e.preventDefault();\r\n        const selectedCategory = document.querySelector('#listCategory').value;\r\n        let url = selectedCategory ? `/getLists?category=${selectedCategory}` : '/getLists';\r\n    \r\n        sendGet(url, displaySelects);\r\n        return false;\r\n    });\r\n\r\n    listSelection.addEventListener('submit', (e) => {\r\n        e.preventDefault();\r\n        const selectedList = document.querySelector('#listSelect').value;\r\n        const url = selectedList ? `/getTierlist?name=${selectedList}` : '/getTierlist';\r\n    \r\n        sendGet(url, displayList);\r\n        return false;\r\n    });\r\n\r\n    listCreation.addEventListener('submit', (e) => {\r\n        e.preventDefault();\r\n        sendPost(listCreation, );\r\n        return false;\r\n    });\r\n\r\n    listRanker.addEventListener('submit', (e) => {\r\n        e.preventDefault();\r\n        sendPost(listRanker, )\r\n    })\r\n\r\n    sendGet('getLists', displaySelects);\r\n}\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430-project-1/./client/client.js?");

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