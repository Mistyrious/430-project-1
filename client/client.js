const handleResponse = async (response, parseResponse) => {

    switch (response.status) {
        case 200:
            break;
        case 201:
            break
        case 204:
            break;
        case 400:
            break;
        case 404:
            break;
        default:
            break;
    }

    if (parseResponse) {
        const obj = await response.json();
        if (obj.message) {

        } else if (obj.tierlists) {}
    }
};

const addCreation = (amount) => {
    let creationForm = document.querySelector('#listCreation');
    if(!creationForm.innerHTML){
        creationForm.innerHTML += `
        <h2>Tierlist Creator</h2>
        <label for="name">Name: </label>
        <input id="name" type="text" name="listName">
        <ol id="itemInputs"></ol>
        <button id="addItem">Add Item Field</button>
        <input type="submit" value="Create List">`;
    }
    for(let i = 0; i < amount; i++){
        addItemInput();
    }
}

const addItemInput = () => {
    let itemOL = document.querySelector('#itemInputs');
    let i = itemOL.childElementCount + 1;
    let newLI = document.createElement('li');
    itemOL.appendChild(newLI);

    const newInput = document.createElement('input');
    newInput.id=`item${i}`;
    newInput.type="text";
    newInput.name=`item${i}`;
    newInput.placeholder="Item Name";

    const newSelect = document.createElement('select');
    newSelect.id = `item${i}Score`;
    newSelect.innerHTML = `
        <option value="">Item Score</option>
        <option value="6">S</option>
        <option value="5">A</option>
        <option value="4">B</option>
        <option value="3">C</option>
        <option value="2">D</option>
        <option value="1">F</option>
    `;

    newLI.appendChild(newInput);
    newLI.appendChild(newSelect);
}

const displaySelects = (listData) => {
    const categorySelect = document.querySelector('#listCategory');
    const listSelect = document.querySelector('#listSelect');

    if (categorySelect.innerHTML === "") {
        const emptyValue = document.createElement('option');
        emptyValue.value = "";
        emptyValue.innerHTML = "";
        categorySelect.appendChild(emptyValue);
        listData.listCategories.forEach((category) => {
            const newValue = document.createElement('option');
            newValue.value - category;
            newValue.innerHTML = category;
            categorySelect.appendChild(newValue);
        });
    }

    listSelect.innerHTML = "";

    listData.listNames.forEach((name) => {
        const newValue = `<option value="${name}">${name}</option>`;
        listSelect.innerHTML += newValue;
    });
}


const sendPost = async (url, body, responseHandler) => {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        'body': body,
    })

      responseHandler(response);
}

const sendGet = async(url, responseHandler) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    const data = await response.json();

    return responseHandler(data);
}

const init = () => {
    const initialMenu = document.querySelector('#initial-menu');
    const initialSelect = document.querySelector('#initial-select');
    const initialCreate = document.querySelector('#initial-create');

    const listSelection = document.querySelector('#listChoiceForm');
    const listCategory = document.querySelector('#listCategory');
    const listCreation = document.querySelector('#listCreation');
    const listRanker = document.querySelector('#listCreation');

    initialSelect.addEventListener('click', () => {
        initialMenu.style.display = "none";
        displaySelects();
        //listSelection.style.display = "initial";
    });

    initialCreate.addEventListener('click', () => {
        initialMenu.style.display = "none";
        addCreation(5);
        //listCreation.style.display = "initial";
    });

    listCategory.addEventListener('change', (e) => {
        e.preventDefault();
        const selectedCategory = document.querySelector('#listCategory').value;
        let url = selectedCategory ? `/getLists?category=${selectedCategory}` : '/getLists';
    
        sendGet(url, displaySelects);
        return false;
    });

    listSelection.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedList = document.querySelector('#listSelect').value;
        const url = selectedList ? `/getTierlist?name=${selectedList}` : '/getTierlist';
    
        sendGet(url, displayList);
        return false;
    });

    // listCreation.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     sendPost(listCreation, );
    //     return false;
    // });

    listRanker.addEventListener('submit', (e) => {
        e.preventDefault();
        sendPost(listRanker, );
    })

    sendGet('getLists', displaySelects);
}

window.onload = init;