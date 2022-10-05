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
        method: nameMethod,
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
    const listSelection = document.querySelector('#listChoiceForm');
    const listCategory = document.querySelector('#listCategory');
    const listCreation = document.querySelector('#listCreation');
    const listRanker = document.querySelector('#listCreation');

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

    listCreation.addEventListener('submit', (e) => {
        e.preventDefault();
        sendPost(listCreation, );
        return false;
    });

    listRanker.addEventListener('submit', (e) => {
        e.preventDefault();
        sendPost(listRanker, )
    })

    sendGet('getLists', displaySelects);
}

window.onload = init;