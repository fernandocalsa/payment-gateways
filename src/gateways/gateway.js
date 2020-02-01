// This class is only to define which methods should expose the actual gateways
class Gateway {
  static id;

  static pay() {
    throw new Error('Not implemented');
  }

  static reimburse() {
    throw new Error('Not implemented');
  }
}

module.exports = Gateway;
