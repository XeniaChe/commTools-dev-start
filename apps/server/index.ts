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
server.listen(process.env.COMTOOLS_PORT, () =>
  console.log(`server listening on port ${process.env.COMTOOLS_PORT}`)
);

export default server;
