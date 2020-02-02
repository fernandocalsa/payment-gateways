// This is the model that connects with the database. In this case the database is just an array
const paymentGateways = require('../gateways');

const payments = [];

class Payment {
  constructor(userId, gatewayId, amount, concept) {
    this.user = userId;
    this.amount = amount;
    this.concept = concept;
    const gateway = paymentGateways[gatewayId];
    if (!gateway) {
      throw new Error('No gateway found');
    }
    this.gateway = gateway.id;
  }

  save() {
    if (!this.id) {
      const lastPayment = payments[payments.length - 1];
      if (lastPayment) {
        this.id = lastPayment.id + 1;
      } else {
        this.id = 1;
      }
      payments.push(this);
      return Promise.resolve(this);
    }
    const paymentIdx = payments.findIndex(({ id }) => id === this.id);
    payments[paymentIdx] = this;
    return Promise.resolve(this);
  }

  async execute() {
    try {
      const gateway = paymentGateways[this.gateway];
      const gatewayPaymentId = await gateway.pay();
      this.gatewayPaymentId = gatewayPaymentId;
      this.status = 'paid';
      this.datePaid = new Date();
    } catch (err) {
      this.err = 'Error while executing payment';
      this.status = 'error';
      this.errDate = new Date();
    }
    return this.save();
  }

  async reimburse(amount) {
    const gateway = paymentGateways[this.gateway];
    try {
      if (amount) {
        await gateway.partialReimburse(this.gatewayPaymentId, amount);
        this.status = 'partial-reimburse';
        this.reimburseAmount = amount;
        this.reimburseDate = new Date();
      } else {
        await gateway.reimburse(this.gatewayPaymentId);
        this.status = 'reimburse';
        this.reimburseDate = new Date();
      }
    } catch (err) {
      this.err = 'Error while reimburse payment';
      this.status = 'error';
      this.errDate = new Date();
    }
    return this.save();
  }

  static findAll() {
    return Promise.resolve(payments);
  }

  static findById(paymentId) {
    const payment = payments.find(({ id }) => id === paymentId);
    if (payment) {
      return Promise.resolve(payment);
    }
    return Promise.reject();
  }
}

module.exports = Payment;
