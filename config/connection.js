const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialNetworkAPI', {
});
module.exports = connection;