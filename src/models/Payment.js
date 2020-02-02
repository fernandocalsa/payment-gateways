// This is the model that connects with the database. In this case the database is just an array
const payments = [];

class Payment {
  constructor(userId, amount, concept) {
    this.user = userId;
    this.amount = amount;
    this.concept = concept;
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

  async execute(gateway) {
    try {
      const gatewayPaymentId = await gateway.pay();
      this.gatewayPaymentId = gatewayPaymentId;
      this.gateway = gateway.id;
      this.status = 'paid';
      this.datePaid = new Date();
    } catch (err) {
      this.err = 'Error while executing payment';
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
