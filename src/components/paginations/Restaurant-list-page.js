import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import CardItem from '../common/CardItem';
import getToken from '../../helpers/getToken';
import { baseAPIURL } from '../../api/api.config';
import SkeletonProduct from '../common/Loader/Product';

import '../component.css';

const CategoryPaginatedItems = ({ itemsPerPage }) => {
  const listName = 'restaurants';
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
    // setIsLoading(true);

    fetch(
      baseAPIURL + listName + (extraQueryParams ? extraQueryParams : ''),
      config,
    )
      .then((response) => response.json())
      .then((data) => {
        const restaurants =
          data &&
          data.restaurants
            .filter((res) => res.categoryID === vendorID)
            .map((resturnat) => {
              return resturnat;
            });

        setData(restaurants);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const getCateroriesData = async () => {
  //     const vendorID = localStorage.getItem('vendorID');

  //     const { error, data } = await getRestaurant();

  //     if (error) {
  //       console.log(error);
  //     }

  //     const restaurants =
  //       data &&
  //       data.restaurants
  //         .filter((res) => res.categoryID === vendorID)
  //         .map((resturnat) => {
  //           return resturnat;
  //         });

  //     console.log('resturnat for category ', restaurants);
  //     return setVendors(restaurants[0]);
  //   };

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
            restaurants.map((resturnat, index) => {
              return (
                <div className="item-homepage-lower-container" key={index}>
                  <CardItem
                    id={resturnat.id}
                    title={resturnat.title}
                    subTitle={resturnat.description}
                    imageAlt="Product"
                    image={resturnat.photo}
                    imageClass="lower-homepage-image-card"
                    linkUrl="detail"
                    time={resturnat.deliverytime}
                    price={resturnat.price}
                    showPromoted={true}
                    promotedVariant="dark"
                    favIcoIconColor="text-danger"
                    rating="3.1 (300+)"
                    singleVendor={resturnat}
                    minamount={resturnat.minamount}
                    deliveryfee={resturnat.deliveryfee}
                  />
                </div>
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
        [1, 2, 3, 4, 5, 6, 7, 8].map((loading) => (
          <div className="col-3" key={loading}>
            <SkeletonProduct />
          </div>
        ))
      )}
    </>
  );
};

export default CategoryPaginatedItems;
