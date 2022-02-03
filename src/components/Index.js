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

import { getRestaurant } from '../helpers/api.request';

const Index = () => {
  const [vendors, setVendors] = useState('');

  useEffect(() => {
    getCateroriesData();
  }, []);

  const getCateroriesData = async () => {
    const { data, error } = await getRestaurant();
    if (error) {
      return console.log(error);
    }
    setVendors(data.restaurants);
    console.log('hello data', data.restaurants);
  };

  return (
    <>
      <TopSearch />
      <section className="section pt-5 pb-5 bg-white homepage-add-section">
        <Container>
          <Row>
            <Col md={3} xs={6}>
              <ProductBox
                image="img/pro1.jpg"
                imageClass="img-fluid rounded"
                imageAlt="product"
                linkUrl="#"
              />
            </Col>
            <Col md={3} xs={6}>
              <ProductBox
                image="img/2.jpg"
                imageClass="img-fluid rounded"
                imageAlt="product"
                linkUrl="#"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section pt-5 pb-5 products-section">
        <Container>
          <SectionHeading
            heading="Popular Brands"
            subHeading="Top restaurants, cafes, pubs, and bars in Ludhiana, based on trends"
          />
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
                      <div className="item" key={index}>
                        <CardItem
                          id={resturnat.id}
                          title={resturnat.title}
                          subTitle={resturnat.description}
                          imageAlt="Product"
                          image={resturnat.photo}
                          imageClass="homepage-image-card"
                          linkUrl="detail"
                          offerText="65% off | Use Coupon OSAHAN50"
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
              </OwlCarousel>
            </Col>
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
