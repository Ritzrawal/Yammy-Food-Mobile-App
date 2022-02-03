import axios from 'axios';

//your copied heroku link
// const    baseURL= 'https://murmuring-caverns-94283.herokuapp.com/',
//PK Key=pk_test_CxRWBhFfw3661tnaPcZFcaz300qefLt63L

export default class PaymentRequestAPI {
  postRequest = async (endPoint, body) => {
    const apiConnector = axios.create(
      'https://murmuring-caverns-94283.herokuapp.com/',
    );
    try {
      const response = await apiConnector.post(endPoint, body);

      return { ...response, success: true };
    } catch (error) {
      const stripeError = error.response ? error.response : error;
      console.log('stripeError: ', stripeError);
      return { stripeError, success: false };
    }
  };

  createStripeCustomer = (email) => {
    const endPoint = '/create-stripe-customer';
    const body = {
      email,
    };

    return this.postRequest(endPoint, body);
  };

  getStripeCustomerID = async (email) => {
    const stripeCustomer = await this.createStripeCustomer(email);

    if (stripeCustomer.success && stripeCustomer?.data?.customer?.id) {
      return stripeCustomer.data.customer.id;
    }

    return false;
  };

  addNewPaymentSource = async (customerId, token) => {
    const endPoint = '/add-payment-source';
    const body = {
      customerId: customerId,
      token,
    };

    return this.postRequest(endPoint, body);
  };

  chargeStripeCustomer = async ({
    customer,
    currency,
    amount,
    source,
    uuid,
  }) => {
    const endPoint = '/charge-stripe-customer';

    const body = {
      customer,
      currency,
      amount,
      source,
      uuid,
    };

    return this.postRequest(endPoint, body);
  };

  deletePaymentSource = (customerId, token) => {
    const endPoint = '/delete-payment-source';
    const body = {
      customerId,
      token,
    };

    return this.postRequest(endPoint, body);
  };

  cleanCustomerStripeAccount = (customer) => {
    const endPoint = '/clean-customer-stripe-account';
    const body = {
      customer,
    };

    return this.postRequest(endPoint, body);
  };
}
