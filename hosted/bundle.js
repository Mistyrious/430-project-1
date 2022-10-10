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

eval("const handleResponse = async (response, parseResponse) => {\r\n\r\n    switch (response.status) {\r\n        case 200:\r\n            break;\r\n        case 201:\r\n            break\r\n        case 204:\r\n            break;\r\n        case 400:\r\n            break;\r\n        case 404:\r\n            break;\r\n        default:\r\n            break;\r\n    }\r\n\r\n    if (parseResponse) {\r\n        const obj = await response.json();\r\n        if (obj.message) {\r\n\r\n        } else if (obj.tierlists) {}\r\n    }\r\n};\r\n\r\nconst addCreation = (amount) => {\r\n    let creationForm = document.querySelector('#listCreation');\r\n    if(!creationForm.innerHTML){\r\n        creationForm.innerHTML += `\r\n        <h2>Tierlist Creator</h2>\r\n        <label for=\"listName\">Name: </label>\r\n        <input id=\"listName\" type=\"text\" name=\"listName\">\r\n        <ol id=\"itemInputs\"></ol>\r\n        <button id=\"addItem\" type=\"button\">Add Item Field</button>\r\n        <input type=\"submit\" value=\"Create List\">`;\r\n    }\r\n    for(let i = 0; i < amount; i++){\r\n        addItemInput();\r\n    }\r\n\r\n    document.querySelector('#addItem').addEventListener('click', addItemInput);\r\n}\r\n\r\nconst addItemInput = () => {\r\n    let itemOL = document.querySelector('#itemInputs');\r\n    let i = itemOL.childElementCount + 1;\r\n    let newLI = document.createElement('li');\r\n    itemOL.appendChild(newLI);\r\n\r\n    const newInput = document.createElement('input');\r\n    newInput.id=`item${i}`;\r\n    newInput.type=\"text\";\r\n    newInput.name=`item${i}`;\r\n    newInput.placeholder=\"Item Name\";\r\n\r\n    const newSelect = document.createElement('select');\r\n    newSelect.id = `item${i}Score`;\r\n    newSelect.innerHTML = `\r\n        <option value=\"\">Item Score</option>\r\n        <option value=\"6\">S</option>\r\n        <option value=\"5\">A</option>\r\n        <option value=\"4\">B</option>\r\n        <option value=\"3\">C</option>\r\n        <option value=\"2\">D</option>\r\n        <option value=\"1\">F</option>\r\n    `;\r\n\r\n    newLI.appendChild(newInput);\r\n    newLI.appendChild(newSelect);\r\n}\r\n\r\nconst displaySelects = (listData) => {\r\n    const categorySelect = document.querySelector('#listCategory');\r\n    const listSelect = document.querySelector('#listSelect');\r\n\r\n    if (categorySelect.innerHTML === \"\") {\r\n        const emptyValue = document.createElement('option');\r\n        emptyValue.value = \"\";\r\n        emptyValue.innerHTML = \"\";\r\n        categorySelect.appendChild(emptyValue);\r\n        listData.listCategories.forEach((category) => {\r\n            const newValue = document.createElement('option');\r\n            newValue.value - category;\r\n            newValue.innerHTML = category;\r\n            categorySelect.appendChild(newValue);\r\n        });\r\n    }\r\n\r\n    listSelect.innerHTML = \"\";\r\n\r\n    listData.listNames.forEach((name) => {\r\n        const newValue = `<option value=\"${name}\">${name}</option>`;\r\n        listSelect.innerHTML += newValue;\r\n    });\r\n}\r\n\r\n\r\nconst sendPost = async (url, body, responseHandler) => {\r\n    const response = await fetch(url, {\r\n        method: 'POST',\r\n        headers: {\r\n          'Accept': 'application/json',\r\n          'Content-Type': 'application/x-www-form-urlencoded',\r\n        },\r\n        'body': body,\r\n    })\r\n\r\n      responseHandler(response);\r\n}\r\n\r\nconst sendGet = async(url, responseHandler) => {\r\n    const response = await fetch(url, {\r\n        method: 'GET',\r\n        headers: {\r\n            'Accept': 'application/json',\r\n        },\r\n    });\r\n\r\n    const data = await response.json();\r\n\r\n    return responseHandler(data);\r\n}\r\n\r\nconst init = () => {\r\n    const initialMenu = document.querySelector('#initial-menu');\r\n    const initialSelect = document.querySelector('#initial-select');\r\n    const initialCreate = document.querySelector('#initial-create');\r\n\r\n    const listSelection = document.querySelector('#listChoiceForm');\r\n    const listCategory = document.querySelector('#listCategory');\r\n    const listCreation = document.querySelector('#listCreation');\r\n    const listRanker = document.querySelector('#listCreation');\r\n\r\n    initialSelect.addEventListener('click', () => {\r\n        initialMenu.style.display = \"none\";\r\n        displaySelects();\r\n        //listSelection.style.display = \"initial\";\r\n    });\r\n\r\n    initialCreate.addEventListener('click', () => {\r\n        initialMenu.style.display = \"none\";\r\n        addCreation(5);\r\n        //listCreation.style.display = \"initial\";\r\n    });\r\n\r\n    listCategory.addEventListener('change', (e) => {\r\n        e.preventDefault();\r\n        const selectedCategory = document.querySelector('#listCategory').value;\r\n        let url = selectedCategory ? `/getLists?category=${selectedCategory}` : '/getLists';\r\n    \r\n        sendGet(url, displaySelects);\r\n        return false;\r\n    });\r\n\r\n    listSelection.addEventListener('submit', (e) => {\r\n        e.preventDefault();\r\n        const selectedList = document.querySelector('#listSelect').value;\r\n        const url = selectedList ? `/getTierlist?name=${selectedList}` : '/getTierlist';\r\n    \r\n        sendGet(url, displayList);\r\n        return false;\r\n    });\r\n\r\n    listCreation.addEventListener('submit', (e) => {\r\n        console.log(\"creation event called\");\r\n        e.preventDefault();\r\n\r\n        const listName = document.querySelector('#listName').value;\r\n        const itemOL = document.querySelector('#itemInputs');\r\n\r\n        let formData = `name=${listName}`;\r\n\r\n        const itemNames = [], itemScores = [];\r\n\r\n        for(let i = 1; i < itemOL.childElementCount + 1; i++){\r\n            itemNames.push(document.querySelector(`#item${i}`).value);\r\n            itemScores.push(document.querySelector(`#item${i}Score`).value);\r\n        }\r\n\r\n        const items = encodeURIComponent(JSON.stringify(itemNames));\r\n        const scores = encodeURIComponent(JSON.stringify(itemScores));\r\n\r\n        formData += `&items=${items}&scores=${scores}`;\r\n\r\n\r\n        console.log(formData);\r\n        sendPost('/addList', formData, handleResponse);\r\n        return false;\r\n    });\r\n\r\n    listRanker.addEventListener('submit', (e) => {\r\n        e.preventDefault();\r\n        //sendPost(listRanker, );\r\n    })\r\n\r\n    sendGet('getLists', displaySelects);\r\n}\r\n\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430-project-1/./client/client.js?");

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