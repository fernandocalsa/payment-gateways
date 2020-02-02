// This is a mock of the gateway library
/**
 * This library is able to launch a payment but it can take a while until it is process.
 * It has a method to retrieve the status of the payment.
 */
const uuidv1 = require('uuid/v1');

const payments = [];

const launchPayment = (amount, concept) => {
  const payment = {
    id: uuidv1(),
    amount,
    concept,
    status: 'processing',
  };
  payments.push(payment);
  setTimeout(() => {
    payment.status = 'completed';
  }, 4000);
  return Promise.resolve(payment);
};

const getPayment = (paymentId) => {
  const payment = payments.find(({ id }) => id === paymentId);
  if (payment) {
    return Promise.resolve(payment);
  }
  return Promise.reject();
};

const reimburse = (paymentId) => {
  const payment = payments.find(({ id }) => id === paymentId);
  setTimeout(() => {
    payment.status = 'reimbursed';
  }, 2000);
  return Promise.resolve();
};

module.exports = {
  launchPayment,
  getPayment,
  reimburse,
};
