import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import CardItem from './../common/CardItem';
import getToken from '../../helpers/getToken';
import { baseAPIURL } from '../../api/api.config';
import OrderCard from '../common/OrderCard';
import '../component.css';

import { firebase } from '../../api/firebase';

const OrderListPaginatedScreen = ({ itemsPerPage }) => {
  const listName = 'orders';
  const currentUser = localStorage.getItem('currentUser');

  const [isLoading, setLoading] = useState(true);
  const [controlledPageCount, setControlledPageCount] = useState(0);
  const [resOrder, setRestaurantsOrder] = useState([]);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const unsubscribe = useRef(null);
  const ref = firebase
    .firestore()
    .collection('restaurant_orders')
    .where('authorID', '==', currentUser)
    .orderBy('createdAt', 'desc');

  useEffect(() => {
    unsubscribe.current = ref.onSnapshot(onCollectionUpdate, (error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe.current();
    };
  }, []);

  const onCollectionUpdate = (querySnapshot) => {
    const data = [];
    setLoading(true);
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      data.push({
        id: doc.id,
        ...docData,
      });
    });
    console.log('firebase data sorting', data);
    // updateOrders(data);
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setRestaurantsOrder(data.slice(itemOffset, endOffset));
    setControlledPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(event.selected);
    setPageSize(newOffset);
  };

  const onDeleteOrder = (orderID) => {
    firebase
      .firestore()
      .collection('restaurant_orders')
      .doc(orderID)
      .delete()
      .then((result) => console.warn(result));
  };

  return (
    <>
      {resOrder &&
        resOrder.map((orders, index) => {
          return (
            <OrderCard
              id={orders.id}
              address={orders.address.city}
              key={index}
              image={orders.products.photo}
              imageAlt=""
              orderNumber={orders.id}
              orderDate="Mon, Nov 12, 7:18 PM"
              deliveredDate={orders.deliverytime}
              orderTitle={orders.products.name}
              address={orders.location}
              orderProducts={orders.products[0]}
              orderTotal={orders.cartPrice}
              helpLink="#"
              detailLink="/detail"
              status={orders.status}
              vendor={orders.vendor}
              onDelete={onDeleteOrder}
            />
          );
        })}
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={controlledPageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
};

export default OrderListPaginatedScreen;
