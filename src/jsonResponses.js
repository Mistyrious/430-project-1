const tierlists = {
  fruits: {
    name: 'fruits',
    category: 'foods',
    items: ['apple', 'strawberry', 'orange', 'banana', 'peach', 'kiwi', 'grape', 'cherry', 'pineapple', 'watermelon', 'mango', 'blueberry', 'cantaloupe'],
    scores: [3, 2, 5, 5, 6, 1, 5, 6, 2, 6, 5, 5, 4],
    trueScores: [3, 2, 5, 5, 6, 1, 5, 6, 2, 6, 5, 5, 4],
    votes: 1,
  },
  colors: {
    name: 'colors',
    category: 'aesthetics',
    items: ['black', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'pink'],
    scores: [6, 5, 2, 1, 3, 6, 6, 3, 4, 6],
    trueScores: [6, 5, 2, 1, 3, 6, 6, 3, 4, 6],
    votes: 1,
  },
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

const getLists = (request, response, params) => {
  const listNames = Object.keys(tierlists);
  const responseJSON = {
    listNames,
  };

  if (params.category) {
    const filteredLists = {};
    listNames.forEach((list) => {
      if (tierlists[list].category === params.category && !filteredLists[list]) {
        filteredLists[list] = tierlists[list];
      }
    });
    responseJSON.listNames = Object.keys(filteredLists);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const getListsMeta = (request, response) => respondJSONMeta(request, response, 200);

const getTierlist = (request, response, params) => {
  const responseJSON = {
    message: 'No list selected',
  };

  if (!params.name) {
    respondJSON(request, response, 400, responseJSON);
  }

  responseJSON.message = 'Retrieving list';
  responseJSON.list = tierlists[params.name];
  return respondJSON(request, response, 200, responseJSON);
};

const getTierlistMeta = (request, response) => { respondJSONMeta(request, response, 200); };

const addList = (request, response, body) => {
  const responseJSON = {
    message: 'A list must have a name and at least five ranked items',
  };

  if (!body.name || body.items.length < 5 || body.scores.length < 5) {
    responseJSON.id = 'addListMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (tierlists[body.name]) {
    responseJSON.message = 'A list with that name already exists!';
    return respondJSON(request, response, 400, responseJSON);
  }
  console.log(body);
  tierlists[body.name] = {
    name: body.name,
    scores: body.scores,
    trueScores: body.scores,
    votes: 1,
  };

  responseJSON.message = 'Created successfully.';
  return respondJSON(request, response, 201, responseJSON);
};

const updateList = (request, response, body) => {
  const responseJSON = {
    message: 'You have not ranked every item',
  };

  if (body.scores.length !== tierlists[body.name].scores.length) {
    responseJSON.id = 'updateListMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  const { votes } = tierlists[body.name];

  for (let i = 0; i < body.scores.length; i++) {
    const oldTrueScore = tierlists[body.name].trueScores[i];
    const newTrueScore = (oldTrueScore * votes + body.scores[i]) / (votes + 1);
    // ^ average in the new value
    tierlists[body.name].trueScores[i] = newTrueScore;
    tierlists[body.name].scores[i] = Math.round(newTrueScore);
  }

  tierlists[body.name].votes += 1;

  responseJSON.message = 'Updated successfully.';
  responseJSON.list = tierlists[body.name];
  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getLists,
  getListsMeta,
  getTierlist,
  getTierlistMeta,
  addList,
  updateList,
  notFound,
  notFoundMeta,
};
