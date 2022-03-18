import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY =
  'pk_test_51Jyx5jHLeH3x1NenEq5ENLYkPQVKspkiVnBEseBYIKnhVI0t2kexEVLV7wO0SGcDIblNLB1zIKNlzG7LGqNJom2O00qlxiMo4T';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({ placeOrder }) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm placeOrder={placeOrder} />
    </Elements>
  );
};

export default StripeContainer;
