const mongoose = require('mongoose');

const dbURI = 'mongodb://loc8r:loc8r@localhost:27018/loc8r?authSource=admin';

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});       

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
} );

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
}

process.on('SIGINT', () => {
  gracefulShutdown('app termination (SIGINT)', () => {
    process.kill(process.pid, 'SIGINT');
  });
}); 

process.on('SIGTERM', () => {
  gracefulShutdown('app termination (SIGTERM)', () => {
    process.kill(process.pid, 'SIGTERM');
  });
}); 

process.on('SIGUSR2', () => {
  gracefulShutdown('app restart (SIGUSR2)', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

require('./location');


