import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = 'pk_test_CxRWBhFfw3661tnaPcZFcaz300qefLt63L';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({ placeOrder }) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm placeOrder={placeOrder} />
    </Elements>
  );
};

export default StripeContainer;
