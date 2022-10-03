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
          
        } else if (obj.tierlists) {
        }
    }
};

const updateCategories = (categories) => {
    categoriesSelect = document.querySelector('listCategory');

    categories.listNames.forEach = (category) =>{
        const newValue = `<option value="${category}">${category}</option>`;
        categoriesSelect.innerHTML += newValue;
    }

}

const requestCategories = async (choiceForm) => {
    const categories = choiceForm.querySelector('#listCategory');
    const selectedCategory = categories.value;
    let url = selectedCategory ? `/getLists?category=${selectedCategory}` : '/getLists';

    const response = await fetch(url, {
      method,
      headers: {
        'Accept': 'application/json',
      },
    });

    updateCategories(response);
};

const sendPost = async (form, responseHandler) => {

}

const init = () => {
    const listSelection = document.querySelector('#listChoiceForm');
    const listCategory = document.querySelector('#listCategory');
    const listCreation = document.querySelector('#listCreation');

    listCategory.addEventListener('change', (e) => {
        requestCategories(listSelection);
    });

    listSelection.addEventListener('submit', (e) => {
        e.preventDefault();
        sendPost(listSelection);
        return false;
    });

    listCreation.addEventListener('submit', (e) => {
        e.preventDefault();
        sendPost(listCreation);
        return false;
    });

    requestCategories(listSelection);
}

window.onload = init;