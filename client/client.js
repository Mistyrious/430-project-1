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
    let creationForm = document.getElementById('listCreation');
    if(!creationForm.innerHTML){
        creationForm.innerHTML += `
        <h2>Tierlist Creator</h2>
        <label for="listName">Name: </label>
        <input id="listName" type="text" name="listName">
        <label for="categoryInput">Category: </label>
        <input id="categoryInput" type="text" name="categoryInput">
        <ol id="itemInputs"></ol>
        <button id="addItem" type="button">Add Item Field</button>
        <input type="submit" value="Create List">`;
    }
    for(let i = 0; i < amount; i++){
        addItemInput();
    }

    document.getElementById('addItem').addEventListener('click', addItemInput);
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
    console.log(listData);
    const categorySelect = document.getElementById('listCategory');
    const listSelect = document.getElementById('listSelect');

    if (categorySelect.innerHTML === "") {
        const emptyValue = document.createElement('option');
        emptyValue.value = "";
        emptyValue.innerHTML = "";
        categorySelect.appendChild(emptyValue);

        const uniqueCategories = new Set(listData.listCategories);
        uniqueCategories.forEach((category) => {
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

const displayVoting = (data) => {
    
}

const displayList = (data) => {
    const list = data.list;
    const content = document.getElementById('tierList');

    const items = [[], [], [], [], [], []];
    for(let i = 0; i < list.items.length; i++){
        items[list.scores[i]-1].push(list.items[i]);     
    }

    for(let i = 0; i < 6; i++){
        document.getElementById(`${i+1}Items`).innerText = items[i].join(', ');
    }

    displayVoting(data);
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
    const initialMenu = document.getElementById('initial-menu');
    const initialSelect = document.getElementById('initial-select');
    const initialCreate = document.getElementById('initial-create');

    const listSelection = document.getElementById('listChoiceForm');
    const listCategory = document.getElementById('listCategory');
    const listCreation = document.getElementById('listCreation');
    const listRanker = document.getElementById('listCreation');

    initialSelect.addEventListener('click', () => {
        initialMenu.style.display = "none";
        sendGet('/getLists', displaySelects);
        listSelection.style.display = "initial";
    });

    initialCreate.addEventListener('click', () => {
        initialMenu.style.display = "none";
        addCreation(5);
        listCreation.style.display = "initial";
    });

    listCategory.addEventListener('change', (e) => {
        e.preventDefault();
        const selectedCategory = document.getElementById('listCategory').value;
        let url = selectedCategory ? `/getLists?category=${selectedCategory}` : '/getLists';
    
        sendGet(url, displaySelects);
        return false;
    });

    listSelection.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedList = document.getElementById('listSelect').value;
        const url = selectedList ? `/getTierlist?name=${selectedList}` : '/getTierlist';
    
        sendGet(url, displayList);
        return false;
    });

    listCreation.addEventListener('submit', (e) => {
        e.preventDefault();

        const listName = encodeURIComponent(document.querySelector('#listName').value);
        const category = encodeURIComponent(document.querySelector('#categoryInput').value);
        const itemOL = document.querySelector('#itemInputs');

        let formData = `name=${listName}&category=${category}`;

        const itemNames = [], itemScores = [];

        for(let i = 1; i < itemOL.childElementCount + 1; i++){
            itemNames.push(document.querySelector(`#item${i}`).value);
            itemScores.push(document.querySelector(`#item${i}Score`).value);
        }

        const items = encodeURIComponent(itemNames);
        const scores = encodeURIComponent(itemScores);
        console.log(items);

        //formData += "&items=" + items + "&scores=" + scores;

        formData += `&items=${items}&scores=${scores}`;


        console.log(formData);
        sendPost('/addList', formData, handleResponse);
        return false;
    });

    listRanker.addEventListener('submit', (e) => {
        e.preventDefault();
        //sendPost(listRanker, );
    })
}

window.onload = init;