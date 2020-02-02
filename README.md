# Payment gateways

This project shows how you can split the code in JavaScript to use different payment gateways that have similar but different methods.

## API

There is an API that you can play with. You can find the API deployed in https://payment-gateways.herokuapp.com/

This API has a few endpoints:

- GET `/payments`: It returns an array with all the payments
- POST `/payments`: It executes a payment. It requires this fields in the body:
  - `userId`
  - `amount`
  - `concept`
  - `gateway`: it can be either `GATEWAY1` or `GATEWAY2`
- GET `/payments/:paymentId`: It returns the payment information
- POST `/payments/:paymentId/reimburse`: It reimburse the payment to the user. It accepts an `amount` in the body, if it is sent it will try to make a partial reimbursment. This only works for some gateways.
