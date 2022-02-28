import { firebase } from '../api/firebase';

import PaymentRequestAPI from './api-card';
import { v4 as uuid } from 'uuid';
export default class CartAPIManager {
  constructor() {
    this.ref = firebase.firestore().collection('restaurant_orders');
    this.paymentRequestAPI = new PaymentRequestAPI();
  }

  async chargeCustomer({ customer, currency, amount, source }) {
    const stripeResponse = await this.paymentRequestAPI.chargeStripeCustomer({
      customer,
      currency,
      amount,
      source,
      uuid: uuid(),
    });
    return stripeResponse;
  }

  placeOrder(
    cartItems,
    user,
    shippingAddress,
    vendor,
    // deliverynote,
    // deliveryTime,
    // payment,
    cartPrice,
    callback,
  ) {
    console.log('order details', user);
    var products = [];
    cartItems.forEach((item) => {
      const { name, photo, price, quantity, note } = item;
      products.push({
        id: item.id,
        cartColors: [],
        cartSizes: ['XS', 'S', 'M'],
        selectedColor: '',
        selectedSize: '',
        name,
        note,
        quantity,
        photo,
        price,
      });
    });

    var order = {
      authorID: user.id,
      author: user,
      products,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: 'Order Placed',
      address: shippingAddress,
      // deliverynote,
      // deliveryTime,
      // payment,
      cartPrice,
    };

    if (vendor?.id) {
      order = {
        ...order,
        vendorID: vendor.id,
        vendor: vendor,
      };
    }

    this.ref
      .add(order)
      .then((response) => {
        const finalOrder = { ...order, id: response.id };
        this.ref.doc(response.id).update(finalOrder);
        callback && callback();
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  }

  orderTimeUpdate(orderId, deliveryTime) {
    console.log('Hello time', deliveryTime);
    firebase.firestore().collection('restaurant_orders').doc(orderId).update({
      deliveryTime,
    });
  }
}
