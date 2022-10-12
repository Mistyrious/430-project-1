const showMessage = (response) => {
    const status = document.getElementById('status');
    const message = response.message;

    status.innerHTML = message;
};

//returns a select with tierlist tiers
const createRankSelect = (idNum) => {
    const selectDiv = document.createElement('div');
    selectDiv.className = "select is-fullwidth";
    const newSelect = document.createElement('select');
    newSelect.id = `item${idNum}Score`;
    newSelect.innerHTML = `
        <option value="">Item Score</option>
        <option value="6">S</option>
        <option value="5">A</option>
        <option value="4">B</option>
        <option value="3">C</option>
        <option value="2">D</option>
        <option value="1">F</option>
    `;

    selectDiv.appendChild(newSelect);
    return selectDiv;
}

//adds an extra item input to the tierlist creation form
const addItemInput = () => {
    let itemOL = document.querySelector('#itemInputs');
    let i = itemOL.childElementCount + 1;
    let newLI = document.createElement('li');
    itemOL.appendChild(newLI);

    const newInput = document.createElement('input');
    newInput.className = "input";
    newInput.id=`item${i}`;
    newInput.type="text";
    newInput.name=`item${i}`;
    newInput.placeholder="Item Name";

    const newSelect = createRankSelect(i);

    newLI.appendChild(newInput);
    newLI.appendChild(newSelect);
}

//create the HTML where users can add a tierlist
const addCreation = (amount) => {
    let creationForm = document.getElementById('listCreation');
    if(!creationForm.innerHTML){
        creationForm.innerHTML += `
        <h2 class="title">Tierlist Creator</h2>
        <div class="field>
            <label class="label" for="listName">Name: </label>
            <input class="input" id="listName" type="text" name="listName">
        </div>
        <div class="field>
            <label class="label" for="categoryInput">Category: </label>
            <input class="input" id="categoryInput" type="text" name="categoryInput">
        </div>
        <label class="label" for="categoryInput">Items: </label>
        <ol id="itemInputs"></ol>
        <button class="button" id="addItem" type="button">Add Item Field</button>
        <input class="button" type="submit" value="Create List">`;
    }
    for(let i = 0; i < amount; i++){
        addItemInput();
    }

    document.getElementById('addItem').addEventListener('click', addItemInput);
}

//updates the selects for user to choose a tierlist from
const displaySelects = (listData) => {
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

//displays a selected tierlist by filling in the data
const displayList = (data) => {
    document.getElementById('tierList').style.display = "flex";
    const list = data.list;
    const rankerUL = document.getElementById('rankerUL');
    rankerUL.innerHTML = "";

    document.getElementById('displayedListName').innerHTML = list.name;

    //shows the tierlist data in a table
    const items = [[], [], [], [], [], []];

    for(let i = 0; i < list.items.length; i++){
        items[list.scores[i]-1].push(list.items[i]);    
        
        const newLI = document.createElement('li');
        const newLabel = document.createElement('label');
        const newDiv =document.createElement('div');

        newDiv.className= 'field is-grouped';
        newLabel.className = 'label';
        newLabel.for = `item${i}Score`;
        newLabel.innerText = `${list.items[i]}: `;
        const newSelect = createRankSelect(i);

        rankerUL.appendChild(newLI);
        newDiv.appendChild(newLabel);
        newDiv.appendChild(newSelect);
        newLI.appendChild(newDiv);

    }

    for(let i = 0; i < 6; i++){
        document.getElementById(`${i+1}Items`).innerText = items[i].join(', ');
    }
}

const sendPost = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        'body': body,
    })

    const res = await response.json();
    return showMessage(res);
}

const sendGet = async(url, responseHandler) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    });

    const data = await response.json();

    if(url !== '/getLists') {showMessage(data);}
    return responseHandler(data);
}

const init = () => {
    const initialMenu = document.getElementById('initial-menu');
    const initialSelect = document.getElementById('initial-select');
    const initialCreate = document.getElementById('initial-create');

    const listSelection = document.getElementById('listChoiceForm');
    const listCategory = document.getElementById('listCategory');
    const listCreation = document.getElementById('listCreation');
    const listRanker = document.getElementById('listRanker');

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

    //takes and sends relevant data from forms for addList
    listCreation.addEventListener('submit', (e) => {
        e.preventDefault();

        const listName = encodeURIComponent(document.querySelector('#listName').value);
        const category = encodeURIComponent(document.querySelector('#categoryInput').value);
        const itemOL = document.querySelector('#itemInputs');

        let formData = `name=${listName}&category=${category}`;

        const itemNames = [], itemScores = [];

        //starting at 1 is unfortuately required due to an
        //error with my structuring of tiers to numbers evaluation
        for(let i = 1; i < itemOL.childElementCount + 1; i++){
            itemNames.push(document.querySelector(`#item${i}`).value);
            itemScores.push(document.querySelector(`#item${i}Score`).value);
        }

        const items = encodeURIComponent(itemNames);
        const scores = encodeURIComponent(itemScores);

        formData += `&items=${items}&scores=${scores}`;

        sendPost('/addList', formData);
        return false;
    });


    //takes and sends relevant data from forms for updateList
    listRanker.addEventListener('submit', (e) => {
        e.preventDefault();

        const itemUL = document.getElementById('rankerUL');

        const listName = encodeURIComponent(document.getElementById('displayedListName').innerText);
        const itemScores = [];

        for(let i = 0; i < itemUL.childElementCount; i++){
            const score = document.querySelector(`#item${i}Score`).value;
            if(!score) {break;}
            itemScores.push(document.querySelector(`#item${i}Score`).value);
        }

        const scores = encodeURIComponent(itemScores);
        const formData = `name=${listName}&scores=${scores}`;

        sendPost('/updateList', formData);
        return false;
    })
}

window.onload = init;