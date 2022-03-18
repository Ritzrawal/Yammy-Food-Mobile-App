import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import '../component.css';
import { useSelector } from 'react-redux';
import React, { useState, useMemo } from 'react';
import { Toast } from 'react-bootstrap';

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [],
  );

  return options;
};

const PaymentForm = ({ placeOrder }) => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const totalPrice = useSelector((state) => state.cart.price);

  const handleSubmit = async (e) => {
    const price = localStorage.getItem('price');
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    console.log('stripe total', totalPrice.newTotal);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:4000/payment', {
          amount: price,
          id,
        });

        if (response.data.success) {
          console.log('response payment', response.data);
          console.log('Successful payment');
          placeOrder();
          setSuccess(true);
          showToast();
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  const showToast = () => {
    return (
      <Toast
        show={success}
        autohide
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}>
        <Toast.Header>
          <strong className="mr-auto">Bootstrap</strong>
          <small>just now</small>
        </Toast.Header>
      </Toast>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-card-form">
      <label className="stripe-card-label">
        Card number
        <CardNumberElement
          options={options}
          onReady={() => {
            console.log('CardNumberElement [ready]');
          }}
          onChange={(event) => {
            console.log('CardNumberElement [change]', event);
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]');
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]');
          }}
        />
      </label>
      <label>
        Expiration date
        <CardExpiryElement
          options={options}
          onReady={() => {
            console.log('CardNumberElement [ready]');
          }}
          onChange={(event) => {
            console.log('CardNumberElement [change]', event);
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]');
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]');
          }}
        />
      </label>
      <label>
        CVC
        <CardCvcElement
          options={options}
          onReady={() => {
            console.log('CardNumberElement [ready]');
          }}
          onChange={(event) => {
            console.log('CardNumberElement [change]', event);
          }}
          onBlur={() => {
            console.log('CardNumberElement [blur]');
          }}
          onFocus={() => {
            console.log('CardNumberElement [focus]');
          }}
        />
      </label>
      <button
        type="submit"
        disabled={!stripe}
        className="btn btn-success btn-block btn-lg">
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
