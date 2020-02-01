// This is a mock of the gateway library
const uuidv1 = require('uuid/v1');

module.exports = {
  executePayment: () => Promise.resolve(uuidv1),
  reimburse: () => Promise.resolve(),
  partialReimburse: () => Promise.resolve(),
};
