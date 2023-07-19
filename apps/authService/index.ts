import server from './src/app';

require('dotenv').config();

// unhandledRejection
process.on('unhandledRejection', function (reason, promise) {
  console.error('Unhandled rejection', { reason: reason, promise });
});

process.on('uncaughtException', function (error, origin) {
  console.error('Unhandled exception', { error, origin });
});

// start
server.listen(process.env.AUTHSERV_PORT, () =>
  console.log(`server listening on port ${process.env.AUTHSERV_PORT}`)
);

export default server;
