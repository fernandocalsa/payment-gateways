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
      this.id = payments[payments.length - 1] + 1;
      payments.push(this);
    }
    payments[this.id] = this;
    return Promise.resolve(this);
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
