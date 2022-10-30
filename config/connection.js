const { connect, connection } = require('mongoose');

// Sets the db name as socialNetwork
connect('mongodb://localhost/socialNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
