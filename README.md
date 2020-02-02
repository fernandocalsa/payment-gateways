# Payment gateways

This project shows how you can split the code in JavaScript to use different payment gateways that have similar but different methods.

## API

There is an API that you can play with. You can find the API deployed in https://payment-gateways.herokuapp.com/

This API has a few endpoints:

- GET `/payments`: It returns an array with all the payments
- POST `/payments`: It executes a payment. It requires these fields in the body:
  - `userId`
  - `amount`
  - `concept`
  - `gateway`: it can be either `GATEWAY1` or `GATEWAY2`
- GET `/payments/:paymentId`: It returns the payment information
- POST `/payments/:paymentId/reimburse`: It reimburses the payment to the user. It accepts an `amount` in the body, if it is sent it will try to make a partial reimbursement. This only works for some gateways.

## Third-party gateways mocks

There are two gateways, `GATEWAY1` and `GATEWAY2`. These gateways are mocked in the folder `src/lib/`.

### Gateway 1
This gateway is pretty straight forward, it has three methods, one for executing a payment, one to reimburse and another one to make a partial reimbursement. These methods are async but are mocked so we do not store anything and the calls are quick.

### Gateway 2
This gateway is a bit weirder than the previous one. It allows you to create a payment with `launchPayment` but when this function resolves, the payment could not be fully processed. If you want to know if the payment was processed you should use the method `getPayment` in order to retrieve the payment status. The payment is set to wait 4 seconds until it is approved.

The `reimburse` method is similar to `launchPayment`, you need to use the `getPayment` method if you want to know if the reimbursement was successful. The reimbursement is set to wait 2 seconds until it is completed.

This gateway does not have the ability to make partial reimbursements.

## Gateway classes

There is a parent class `Gateway` in `src/gateways/gateway`. This class declares only those methods that every gateway should implement, so other parts of the system can interact with the different gateways as if they were the same. This is that, either if you are using one gateway or another, you will always have the same methods.

### Gateway1

This class is an abstraction from the gateway 1. It exposes the methods `pay`, `reimburse` and `partialReimburse`. These methods are simple wrappers around the gateway1 library explained before.

### Gateway2

This class is an abstraction from the gateway 2. In this case, the class needs to make some work in order to have the same interface as the previous one. In the case of the `pay` method, it has to create the payment and then query to the gateway every 500ms to know if the payment was successful.

It happens the same with the `reimburse` method.

This gateway does not have the option to make partial reimbursements so it doesn't expose any function for that.

