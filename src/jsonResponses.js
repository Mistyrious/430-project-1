const tierlists = {
  "fruits" : {
    name: "fruits",
    category: "foods",
    items: ["apple", "strawberry", "orange", "banana", "peach", "kiwi", "grape", "cherry", "pineapple", "watermelon", "mango", "blueberry", "cantaloupe"],
    scores: [3, 2, 5, 5, 6, 1, 5, 6, 2, 6, 5, 5, 4],
    votes: 1,
  },
  "colors" : {
    name: "colors",
    category: "aesthetics",
    items: ["black", "white", "red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink"],
    scores: [6, 5, 2, 1, 3, 6, 6, 3, 4, 6],
    votes: 1,
  }
};
// tier key: 1 is F, 2 D, 3 C, 4 B, 5 A, 6 S

const respondJSON = (request, response, status, object) => {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
  };
  
  const respondJSONMeta = (request, response, status) => {
    const headers = {
      'Content-Type': 'application/json',
    };
  
    response.writeHead(status, headers);
    response.end();
  };

  const getLists = (request, response) => {
    const responseJSON = {
        tierlists,
      };
      return respondJSON(request, response, 200, responseJSON);
  }

  const getListsMeta = (request, response) => respondJSONMeta(request, response, 200);

  const addList = (request, response, body) =>{
    let responseCode = 204;
    const responseJSON = {
      message: 'A list must have a name and at least five ranked items',
    };
  
    if(!body.name || body.items.length < 5 || body.scores.length < 5){
       responseJSON.id = 'addListMissingParams';
       return respondJSON(request, response, 400, responseJSON);
    }

    if(tierlists[body.name]){
      responseJSON.message = 'A list with that name already exists!';
      return respondJSON(request, response, 400, responseJSON);
    } else{
      tierlists[body.name] = {
        name: body.name,
        scores: [], //add in the scores
        votes: 1,
      };

      responseJSON.message = 'Created successfully.';
      return respondJSON(request, response, 201, responseJSON);
    }
  
    //uhhhh check smth ur missing smth here i think
    return respondJSONMeta(request, response, responseCode);
  }

  module.exports = {
    getLists,
    getListsMeta,
    addList
  }