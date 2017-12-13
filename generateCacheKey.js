const uuid = require('uuid');

const generateKey = parsedMessage => `${parsedMessage.location}-${parsedMessage.username}-${uuid.v4()}`;

module.exports = {
  generateKey,
};
