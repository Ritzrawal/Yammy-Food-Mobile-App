import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
// import CardItem from './common/CardItem';
import getToken from '../../helpers/getToken';
import { baseAPIURL } from '../../api/api.config';
import BestSeller from '../common/BestSeller';
import { Row, Col } from 'react-bootstrap';
import SkeletonProduct from '../common/Loader/Product';

// import { getRestaurant } from '../helpers/api.request';

import '../component.css';

const CategoryItems = ({ itemsPerPage }) => {
  const listName = 'products';
  const pageIndex = 0;

  const [isLoading, setIsLoading] = useState(true);
  const [controlledPageCount, setControlledPageCount] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const vendorID = localStorage.getItem('vendorID');
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };

    const extraQueryParams = null;
    setIsLoading(true);

    fetch(
      baseAPIURL + listName + (extraQueryParams ? extraQueryParams : ''),
      config,
    )
      .then((response) => response.json())
      .then((data) => {
        const vendor =
          data &&
          data.products
            .filter((vendor) => vendor.vendorID === vendorID)
            .map((vendorId) => {
              return vendorId;
            });
        setData(vendor);
        console.log('profuct list', vendor);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setRestaurants(data.slice(itemOffset, endOffset));
    setControlledPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    );
    setItemOffset(event.selected);
    setPageSize(newOffset);
    getData();
  };

  return (
    <>
      {!isLoading ? (
        <>
          {restaurants &&
            restaurants.map((products, index) => {
              return (
                <Col md={4} sm={6} className="mb-4" key={index}>
                  <BestSeller
                    id={index}
                    title={products.name}
                    subTitle={products.description}
                    imageAlt={products.photo}
                    image={products.photo}
                    alleryinfo={products.alleryinfo}
                    imageClass="img-fluid-item-img"
                    price={products.price}
                    priceUnit="$"
                    isNew={true}
                    products={products}
                    showPromoted={true}
                    promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="3.1 (300+)"
                  />
                </Col>
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
      ) : (
        [1, 2, 3, 4].map((loading) => (
          <div className="col-3" key={loading}>
            <SkeletonProduct />
          </div>
        ))
      )}
    </>
  );
};

export default CategoryItems;
