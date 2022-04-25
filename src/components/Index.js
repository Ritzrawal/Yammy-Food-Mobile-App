import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel3';
import TopSearch from './home/TopSearch';
import ProductBox from './home/ProductBox';
import CardItem from './common/CardItem';
import SectionHeading from './common/SectionHeading';
import FontAwesome from './common/FontAwesome';
import './common/styles/index.css';
import HomePaginatedItems from './paginations/HomePage';
import SkeletonProduct from './common/Loader/Product';

import { getCaterogies } from '../helpers/api.request';

import Location from './Location';

const Index = () => {
  const [vendors, setVendors] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCateroriesData();
  }, []);

  const getCateroriesData = async () => {
    const { data, error } = await getCaterogies();
    if (error) {
      return console.log(error);
    }

    setVendors(data.categories);
    setLoading(false);
  };

  return (
    <>
      <TopSearch />
      <section className="section pt-5 pb-5 bg-white homepage-add-section">
        <SectionHeading heading="Best Deals" />
        <Container>
          {!loading ? (
            <Row>
              <Col md={12}>
                <OwlCarousel
                  nav
                  loop
                  {...options}
                  className="owl-carousel-four owl-theme">
                  {vendors &&
                    vendors.map((resturnat, index) => {
                      return (
                        <ProductBox
                          key={resturnat.id}
                          id={resturnat.id}
                          title={resturnat.title}
                          image={resturnat.photo}
                          imageClass="img-fluid-product"
                          imageAlt="product"
                          linkUrl="#"
                          titleClass="product-title-class"
                          boxClass="product-box-image"
                        />
                      );
                    })}
                </OwlCarousel>
              </Col>
            </Row>
          ) : (
            <div className="skeleton-container-display-image">
              {[1, 2, 3, 4].map((loading) => (
                <div className="col-3" key={loading}>
                  <SkeletonProduct />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
      <section className="section pt-5 pb-5 products-section">
        <Container>
          <SectionHeading heading="Most Popular" />
          <Row>
            <HomePaginatedItems itemsPerPage={12} />
          </Row>
        </Container>
      </section>
      <section className="section pt-5 pb-5 bg-white becomemember-section border-bottom">
        <Container>
          <SectionHeading
            heading="Become a Member"
            subHeading="Lorem Ipsum is simply dummy text of"
          />
          <Row>
            <Col sm={12} className="text-center">
              <Link to="register" className="btn btn-success btn-lg">
                Create an Account <FontAwesome icon="chevron-circle-right" />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

const options = {
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
    1200: {
      items: 4,
    },
  },

  lazyLoad: true,
  pagination: false.toString(),
  loop: true,
  dots: false,
  autoPlay: 2000,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
};

export default Index;
