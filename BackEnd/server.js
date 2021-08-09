require('dotenv').config();
//for env variable to keep our secrets safe =) 

const http = require('http');
//we use https to improve the security level of this application 

const app = require('./app');
//import file app to use apply on serve


//that function will send valid port, that will set up connexion port of his environnement 
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};


//we add port Port (in variable env) as a default one if environnement don't add it
const port = normalizePort(3001 || 3001);
app.set('port', port);


//that function will search error and manege it, then save it on serve.
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


//creat a serve with express app
const server = http.createServer(app);

//launch serve and show port connect or manege mistakke (show on clg)
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);


