const Gateway = require('./gateway');
const libGateway2 = require('../lib/gateway2');

class pGateway2 extends Gateway {
  static id = 'GATEWAY2';

  /**
   * It launches the payment and wait until it is completed or denied. Returns a promise
   * that resolves with the paymentId from the gateway
   * @param {Number} amount Amount to pay
   * @param {String} concept Concept for the transaction
   */
  static async pay(amount, concept) {
    const paymentData = await libGateway2.launchPayment(amount, concept);
    await this.waitUntilStatus(paymentData.id, 'completed');
    return Promise.resolve(paymentData.id);
  }

  /**
   * Launches the reimburse and waits until it is completed
   * @param {String} paymentId Id of the payment in the gateway
   */
  static async reimburse(paymentId) {
    await libGateway2.reimburse(paymentId);
    await this.waitUntilStatus(paymentId, 'reimbursed');
    return Promise.resolve();
  }

  /**
   * Checks the status of a payment. It returns a promise and it
   * resolves when it reaches that status or rejects if the new
   * status is error
   * @param {String} paymentId Id of the payment in the gateway
   * @param {String} status Expected status we are waiting for
   */
  static async waitUntilStatus(paymentId, status) {
    return new Promise((res, rej) => {
      const intervalId = setInterval(async () => {
        const paymentDataUpdated = await libGateway2.getPayment(paymentId);
        if (paymentDataUpdated.status === status) {
          clearInterval(intervalId);
          return res(paymentId);
        }
        if (paymentDataUpdated.status === 'error') {
          clearInterval(intervalId);
          return rej(new Error('Error while processing transaction'));
        }
        return undefined;
      }, 500);
    });
  }
}

module.exports = pGateway2;
