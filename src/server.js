const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const parseBody = (request, response, requestHandler) => {
  const body = [];

  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    return requestHandler(request, response, bodyParams);
  });
};

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/bundle.js': htmlHandler.getBundle,
    '/getLists': jsonHandler.getLists,
    '/getTierlist': jsonHandler.getTierlist,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getLists': jsonHandler.getListsMeta,
    '/getTierlist': jsonHandler.getTierlistMeta,
    notFound: jsonHandler.notFoundMeta,
  },
  POST: {
    '/addList': parseBody,
    '/updateList': parseBody,
  },
};

const onRequest = (request, response) => {
  const pUrl = url.parse(request.url);
  console.log(request.method);

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  if (urlStruct[request.method][pUrl.pathname] === 'addList') {
    return urlStruct[request.method][pUrl.pathname](request, response, jsonHandler.addList);
  } if (urlStruct[request.method][pUrl.pathname]) {
    return urlStruct[request.method][pUrl.pathname](request, response, query.parse(pUrl.query));
  }
  return urlStruct[request.method].notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
