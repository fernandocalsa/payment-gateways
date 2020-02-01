const libGateway1 = require('../lib/gateway1');
const Gateway = require('./gateway');

class pGateway1 extends Gateway {
  static id = 'GATEWAY1';

  static async pay(amount, concept) {
    const paymentGatewayId = await libGateway1.executePayment(amount, concept);
    return paymentGatewayId;
  }

  static reimburse() {
    return libGateway1.reimburse();
  }

  static partialReimburse() {
    return libGateway1.partialReimburse();
  }
}

module.exports = pGateway1;
