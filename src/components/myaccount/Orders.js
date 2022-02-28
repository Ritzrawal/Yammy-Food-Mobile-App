import React, { useState, useEffect } from 'react';
import OrderCard from '../common/OrderCard';

import OrderListPaginatedScreen from '../paginations/OrderPagination';

import { getOrders } from '../../helpers/api.request';

const Orders = () => {
  const [order, setOrders] = useState('');

  // useEffect(() => {
  //   getUserOrders();
  // }, []);

  useEffect(() => {
    getUserOrders();
  }, []);

  const getUserOrders = async () => {
    const currentUser = localStorage.getItem('currentUser');

    const { error, data } = await getOrders();

    if (error) {
      console.log(error);
    }

    console.log('order list ', data);

    const orders =
      data &&
      data.orders
        .filter((user) => user.authorID === currentUser)
        .map((userId) => {
          return userId;
        });

    console.log('order data', orders);

    return setOrders(orders);
  };

  // const getUserOrders = async () => {
  //   const { data, error } = await getOrders();

  //   if (error) {
  //     console.log('error find', error);
  //   }
  //   return setOrders(data.restaurants);
  // };

  return (
    <>
      <div className="p-4 bg-white shadow-sm">
        <h4 className="font-weight-bold mt-0 mb-4">Your Orders</h4>
        <OrderListPaginatedScreen itemsPerPage={10} />
      </div>
    </>
  );
};
export default Orders;
