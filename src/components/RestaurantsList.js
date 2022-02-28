import Icofont from 'react-icofont';
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import PageTitle from './common/PageTitle';

import CategoriesCarousel from './common/CategoriesCarousel';
import CategoryPaginatedItems from './paginations/Restaurant-list-page';

const RestaurantList = () => {
  return (
    <>
      <PageTitle
        title="All Restaurants Near You"
        subTitle="Best deals at your favourite restaurants"
      />
      <section className="section pt-5 pb-5 products-listing">
        <Container>
          <Row>
            <Col md={3}>
              <div className="filters shadow-sm rounded bg-white mb-4">
                <div className="filters-header border-bottom pl-4 pr-4 pt-3 pb-3">
                  <h5 className="m-0">Category's Restaurant</h5>
                </div>
              </div>
            </Col>
            <Col md={9}>
              <CategoriesCarousel />
              <Row>
                <CategoryPaginatedItems itemsPerPage={9} />
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default RestaurantList;
