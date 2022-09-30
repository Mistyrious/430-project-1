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

const sendFetch = async (url) => {
    const response = await fetch(url);
    handleResponse(response);
};

const init = () => {

}

window.onload = init;