import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Tab,
  Nav,
  Image,
  Badge,
  Button,
  Tooltip,
  Container,
  InputGroup,
  OverlayTrigger,
} from 'react-bootstrap';
import ItemsCarousel from './common/ItemsCarousel';
import GalleryCarousel from './common/GalleryCarousel';
import CheckoutItem from './common/CheckoutItem';
import BestSeller from './common/BestSeller';
import QuickBite from './common/QuickBite';
import StarRating from './common/StarRating';
import RatingBar from './common/RatingBar';
import Review from './common/Review';
import Icofont from 'react-icofont';
import CategoryItems from './paginations/Category';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updatePrice } from '../store/redux/cart/actions';
import { getProduct, getRestaurant } from '../helpers/api.request';

const Detail = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [product, setProduct] = useState('');
  const [singleResturant, setSingleResturant] = useState('');
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  const cartReducer = useSelector((state) => state.cart.cartItems);
  const vendors = useSelector((state) => state.vendor.vendors);

  const users = [
    {
      name: 'Osahan Singh',
      image: '/img/user/5.png',
      url: '#',
    },
    {
      name: 'Gurdeep Osahan',
      image: '/img/user/2.png',
      url: '#',
    },
    {
      name: 'Askbootstrap',
      image: '/img/user/3.png',
      url: '#',
    },
    {
      name: 'Osahan Singh',
      image: '/img/user/4.png',
      url: '#',
    },
  ];

  useEffect(() => {
    getTotalPrice();
  }, [cartReducer, totalPrice]);

  const getTotalPrice = () => {
    if (cartReducer.length > 0) {
      const newTotalPrice = cartReducer.reduce(
        (prev, next) => prev + next.price * next.quantity,
        0,
      );
      console.log('Hello total cart  ', newTotalPrice);
      setTotalPrice(newTotalPrice);
    }
  };

  useEffect(() => {
    getProductList();
    getSingleResturnat();
    // getCartItems();
  }, []);

  // const getProductList = async () => {
  //   const { data, error } = await getProduct();
  //   if (error) {
  //     return console.log(error);
  //   }
  //   setProduct(data.products);
  //   // console.log('hello product', data.products);
  // };

  const getProductList = async () => {
    const vendorID = localStorage.getItem('vendorID');

    const { error, data } = await getProduct();

    if (error) {
      console.log(error);
    }
    const vendor =
      data &&
      data.products
        .filter((vendor) => vendor.vendorID === vendorID)
        .map((vendorId) => {
          return vendorId;
        });

    return setProduct(vendor);
  };

  const getSingleResturnat = async () => {
    const vendorID = localStorage.getItem('vendorID');

    const { error, data } = await getRestaurant();

    if (error) {
      console.log(error);
    }

    const resturnt =
      data &&
      data.restaurants
        .filter((res) => res.id === vendorID)
        .map((resturnat) => {
          return resturnat;
        });

    return setSingleResturant(resturnt[0]);
  };

  const hideAddressModal = () => {
    setShowAddressModal(false);
  };
  const getQty = ({ id, quantity }) => {
    getTotalPrice();
    console.log(id);
    console.log(quantity);
  };
  const getStarValue = ({ value }) => {
    console.log(value);
    //console.log(quantity);
  };

  const getCartItems = () => {
    const items = JSON.parse(localStorage.getItem('@MySuperCart:key'));

    if (items.cartItems.length > 0) {
      setCartItems(items.cartItems);
    }
  };

  console.log('total prise', totalPrice);

  const onCheckout = () => {
    const price = {
      deliveryFee: singleResturant.deliveryfee,
      newTotal: Number(totalPrice) + Number(singleResturant.deliveryfee),
    };
    dispatch(updatePrice(price));
    localStorage.setItem(
      'price',
      Number(totalPrice) + Number(singleResturant.deliveryfee),
    );

    history.push('checkout');
  };

  return (
    <>
      <section className="restaurant-detailed-banner">
        <div className="text-center">
          <Image fluid className="cover" src={singleResturant.photo} />
        </div>
        <div className="restaurant-detailed-header">
          <Container>
            <Row className="d-flex align-items-end">
              <Col md={8}>
                <div className="restaurant-detailed-header-left">
                  <Image
                    fluid
                    className="mr-3 float-left"
                    alt="osahan"
                    src={singleResturant.photo}
                  />
                  <h2 className="text-white">{singleResturant.title}</h2>
                  <p className="text-white mb-1">
                    <Icofont icon="location-pin" /> {singleResturant.location}{' '}
                    <Badge variant="success">OPEN</Badge>
                  </p>
                  <p className="text-white mb-0">
                    <Icofont icon="food-cart" />
                    {singleResturant.description}
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="restaurant-detailed-header-right text-right">
                  <Button variant="success" type="button">
                    <Icofont icon="clock-time" /> {singleResturant.deliverytime}{' '}
                    min
                  </Button>
                  <h6 className="text-white mb-0 restaurant-detailed-ratings">
                    <span className="generator-bg rounded text-white">
                      <Icofont icon="star" /> 3.1
                    </span>{' '}
                    {singleResturant.reviewsSum} Ratings
                    <Icofont icon="speech-comments" className="ml-3" />{' '}
                    {singleResturant.reviewsCount} Reviewer
                  </h6>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <Tab.Container defaultActiveKey="first">
        <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
          <Container>
            <Row>
              <Col md={12}>
                <span className="restaurant-detailed-action-btn float-right">
                  <Button
                    variant="light"
                    size="sm"
                    className="border-light-btn mr-1"
                    type="button">
                    <Icofont icon="heart" className="text-danger" /> Mark as
                    Favourite
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className="border-light-btn mr-1"
                    type="button">
                    <Icofont icon="cauli-flower" className="text-success" />{' '}
                    Pure Veg
                  </Button>
                  <Button variant="outline-danger" size="sm" type="button">
                    <Icofont icon="sale-discount" /> OFFERS
                  </Button>
                </span>
                <Nav id="pills-tab">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Order Online</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Gallery</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Restaurant Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">Book A Table</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fifth">Ratings & Reviews</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
          <Container>
            <Row>
              <Col md={8}>
                <div className="offer-dedicated-body-left">
                  <Tab.Content className="h-100">
                    <Tab.Pane eventKey="first">
                      <h5 className="mb-4">Recommended</h5>
                      <Form className="explore-outlets-search mb-4">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Search for dishes..."
                          />
                          <InputGroup.Append>
                            <Button type="button" variant="link">
                              <Icofont icon="search" />
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Form>
                      <h6 className="mb-3">
                        Most Popular{' '}
                        <Badge variant="success">
                          {' '}
                          <Icofont icon="tags" /> 15% Off All Items{' '}
                        </Badge>
                      </h6>
                      <ItemsCarousel />

                      <Row>
                        <h5 className="mb-4 mt-3 col-md-12">Best Sellers</h5>

                        {}
                        <CategoryItems itemsPerPage={12} />
                      </Row>
                      {/* <Row>
                        <h5 className="mb-4 mt-3 col-md-12">
                          Quick Bites{' '}
                          <small className="h6 text-black-50">3 ITEMS</small>
                        </h5>
                        <Col md={12}>
                          <div className="bg-white rounded border shadow-sm mb-4">
                            <QuickBite
                              id={1}
                              title="Chicken Tikka Sub"
                              price={250}
                              priceUnit="$"
                              getValue={getQty}
                            />
                            <QuickBite
                              id={2}
                              title="Cheese corn Roll"
                              price={600}
                              showBadge={true}
                              badgeText="BEST SELLER"
                              qty={1}
                              priceUnit="$"
                              getValue={getQty}
                            />
                            <QuickBite
                              id={3}
                              title="Chicken Tikka Sub"
                              price={250}
                              showBadge={true}
                              badgeText="Pure Veg"
                              badgeVariant="success"
                              qty={2}
                              priceUnit="$"
                              getValue={getQty}
                            />
                          </div>
                        </Col>
                      </Row> */}
                      {/* <Row>
                        <h5 className="mb-4 mt-3 col-md-12">
                          Starters{' '}
                          <small className="h6 text-black-50">3 ITEMS</small>
                        </h5>
                        <Col md={12}>
                          <div className="bg-white rounded border shadow-sm mb-4">
                            <QuickBite
                              id={1}
                              itemClass="menu-list"
                              image="/img/5.jpg"
                              title="Chicken Tikka Sub"
                              price={250}
                              priceUnit="$"
                              getValue={getQty}
                            />
                            <QuickBite
                              id={2}
                              itemClass="menu-list"
                              title="Cheese corn Roll"
                              image="/img/2.jpg"
                              price={600}
                              showBadge={true}
                              badgeText="BEST SELLER"
                              qty={1}
                              priceUnit="$"
                              getValue={getQty}
                            />
                            <QuickBite
                              id={3}
                              itemClass="menu-list"
                              image="/img/3.jpg"
                              title="Chicken Tikka Sub"
                              price={250}
                              showBadge={true}
                              badgeText="Pure Veg"
                              badgeVariant="success"
                              priceUnit="$"
                              getValue={getQty}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <h5 className="mb-4 mt-3 col-md-12">
                          Soups{' '}
                          <small className="h6 text-black-50">8 ITEMS</small>
                        </h5>
                        <Col md={12}>
                          <div className="bg-white rounded border shadow-sm">
                            <QuickBite
                              id={1}
                              title="Chicken Tikka Sub"
                              price={250}
                              priceUnit="$"
                              getValue={getQty}
                            />
                            <QuickBite
                              id={2}
                              title="Cheese corn Roll"
                              price={600}
                              showBadge={true}
                              badgeText="BEST SELLER"
                              qty={1}
                              priceUnit="$"
                              getValue={getQty}
                            />
                            <QuickBite
                              id={3}
                              title="Chicken Tikka Sub"
                              price={250}
                              showBadge={true}
                              badgeText="Pure Veg"
                              badgeVariant="success"
                              priceUnit="$"
                              getValue={getQty}
                            />
                            <QuickBite
                              id={1}
                              title="Chicken Tikka Sub"
                              price={250}
                              priceUnit="$"
                              getValue={getQty}
                            />
                            <QuickBite
                              id={2}
                              title="Cheese corn Roll"
                              price={600}
                              showBadge={true}
                              badgeText="BEST SELLER"
                              priceUnit="$"
                              getValue={getQty}
                            />
                            <QuickBite
                              id={3}
                              title="Chicken Tikka Sub"
                              price={250}
                              showBadge={true}
                              badgeText="Pure Veg"
                              badgeVariant="success"
                              priceUnit="$"
                              getValue={getQty}
                            />
                          </div>
                        </Col>
                      </Row> */}
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div className="position-relative">
                        <GalleryCarousel />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <div
                        id="restaurant-info"
                        className="bg-white rounded shadow-sm p-4 mb-4">
                        <div className="address-map float-right ml-5">
                          <div className="mapouter">
                            <div className="gmap_canvas">
                              <iframe
                                title="addressMap"
                                width="300"
                                height="170"
                                id="gmap_canvas"
                                src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=9&ie=UTF8&iwloc=&output=embed"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"></iframe>
                            </div>
                          </div>
                        </div>
                        <h5 className="mb-4">Restaurant Info</h5>
                        <p className="mb-3">
                          Jagjit Nagar, Near Railway Crossing,
                          <br /> Near Model Town, Ludhiana, PUNJAB
                        </p>
                        <p className="mb-2 text-black">
                          <Icofont icon="phone-circle text-primary mr-2" /> +91
                          01234-56789, +91 01234-56789
                        </p>
                        <p className="mb-2 text-black">
                          <Icofont icon="email text-primary mr-2" />{' '}
                          iamosahan@gmail.com, osahaneat@gmail.com
                        </p>
                        <p className="mb-2 text-black">
                          <Icofont icon="clock-time text-primary mr-2" /> Today
                          11am – 5pm, 6pm – 11pm
                          <Badge variant="success" className="ml-1">
                            {' '}
                            OPEN NOW{' '}
                          </Badge>
                        </p>
                        <hr className="clearfix" />
                        <p className="text-black mb-0">
                          You can also check the 3D view by using our menue map
                          clicking here &nbsp;&nbsp;&nbsp;{' '}
                          <Link className="text-info font-weight-bold" to="#">
                            Venue Map
                          </Link>
                        </p>
                        <hr className="clearfix" />
                        <h5 className="mt-4 mb-4">More Info</h5>
                        <p className="mb-3">
                          Dal Makhani, Panneer Butter Masala, Kadhai Paneer,
                          Raita, Veg Thali, Laccha Paratha, Butter Naan
                        </p>
                        <div className="border-btn-main mb-4">
                          <Link className="border-btn text-success mr-2" to="#">
                            <Icofont icon="check-circled" /> Breakfast
                          </Link>
                          <Link className="border-btn text-danger mr-2" to="#">
                            <Icofont icon="close-circled" /> No Alcohol
                            Available
                          </Link>
                          <Link className="border-btn text-success mr-2" to="#">
                            <Icofont icon="check-circled" /> Vegetarian Only
                          </Link>
                          <Link className="border-btn text-success mr-2" to="#">
                            <Icofont icon="check-circled" /> Indoor Seating
                          </Link>
                          <Link className="border-btn text-success mr-2" to="#">
                            <Icofont icon="check-circled" /> Breakfast
                          </Link>
                          <Link className="border-btn text-danger mr-2" to="#">
                            <Icofont icon="close-circled" /> No Alcohol
                            Available
                          </Link>
                          <Link className="border-btn text-success mr-2" to="#">
                            <Icofont icon="check-circled" /> Vegetarian Only
                          </Link>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      <div
                        id="book-a-table"
                        className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
                        <h5 className="mb-4">Book A Table</h5>
                        <Form>
                          <Row>
                            <Col sm={6}>
                              <Form.Group>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Full Name"
                                />
                              </Form.Group>
                            </Col>
                            <Col sm={6}>
                              <Form.Group>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Email address"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={6}>
                              <Form.Group>
                                <Form.Label>Mobile number</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Mobile number"
                                />
                              </Form.Group>
                            </Col>
                            <Col sm={6}>
                              <Form.Group>
                                <Form.Label>Date And Time</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Date And Time"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Group className="text-right">
                            <Button variant="primary" type="button">
                              {' '}
                              Submit{' '}
                            </Button>
                          </Form.Group>
                        </Form>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fifth">
                      <div
                        id="ratings-and-reviews"
                        className="bg-white rounded shadow-sm p-4 mb-4 clearfix restaurant-detailed-star-rating">
                        <div className="star-rating float-right">
                          <StarRating
                            fontSize={26}
                            star={5}
                            getValue={getStarValue}
                          />
                        </div>
                        <h5 className="mb-0 pt-1">Rate this Place</h5>
                      </div>
                      <div className="bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
                        <h5 className="mb-0 mb-4">Ratings and Reviews</h5>
                        <div className="graph-star-rating-header">
                          <div className="star-rating">
                            <StarRating
                              fontSize={18}
                              disabled={true}
                              star={5}
                              getValue={getStarValue}
                            />
                            <b className="text-black ml-2">334</b>
                          </div>
                          <p className="text-black mb-4 mt-2">
                            Rated 3.5 out of 5
                          </p>
                        </div>
                        <div className="graph-star-rating-body">
                          <RatingBar leftText="5 Star" barValue={56} />
                          <RatingBar leftText="4 Star" barValue={23} />
                          <RatingBar leftText="3 Star" barValue={11} />
                          <RatingBar leftText="2 Star" barValue={6} />
                          <RatingBar leftText="1 Star" barValue={4} />
                        </div>
                        <div className="graph-star-rating-footer text-center mt-3 mb-3">
                          <Button
                            type="button"
                            variant="outline-primary"
                            size="sm">
                            Rate and Review
                          </Button>
                        </div>
                      </div>
                      <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
                        <Link
                          to="#"
                          className="btn btn-outline-primary btn-sm float-right">
                          Top Rated
                        </Link>
                        <h5 className="mb-1">All Ratings and Reviews</h5>
                        <Review
                          image="/img/user/1.png"
                          ImageAlt=""
                          ratingStars={5}
                          Name="Singh Osahan"
                          profileLink="#"
                          reviewDate="Tue, 20 Mar 2020"
                          reviewText="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classNameical literature, discovered the undoubtable source. Lorem Ipsum comes from sections"
                          likes="856M"
                          dislikes="158K"
                          otherUsers={users}
                        />
                        <hr />
                        <Review
                          image="/img/user/6.png"
                          ImageAlt=""
                          ratingStars={5}
                          Name="Gurdeep Osahan"
                          profileLink="#"
                          reviewDate="Tue, 20 Mar 2020"
                          reviewText="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                          likes="88K"
                          dislikes="1K"
                          otherUsers={users}
                        />
                        <hr />
                        <Link
                          className="text-center w-100 d-block mt-4 font-weight-bold"
                          to="#">
                          See All Reviews
                        </Link>
                      </div>
                      <div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
                        <h5 className="mb-4">Leave Comment</h5>
                        <p className="mb-2">Rate the Place</p>
                        <div className="mb-4">
                          <div className="star-rating">
                            <StarRating
                              fontSize={26}
                              star={5}
                              getValue={getStarValue}
                            />
                          </div>
                        </div>
                        <Form>
                          <Form.Group>
                            <Form.Label>Your Comment</Form.Label>
                            <Form.Control as="textarea" />
                          </Form.Group>
                          <Form.Group>
                            <Button variant="primary" size="sm" type="button">
                              {' '}
                              Submit Comment{' '}
                            </Button>
                          </Form.Group>
                        </Form>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Col>
              <Col md={4}>
                <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
                  <h5 className="mb-1 text-white">Your Order</h5>
                  <p className="mb-4 text-white">
                    {cartReducer && cartReducer.length} Items
                  </p>
                  <div className="bg-white rounded shadow-sm mb-2">
                    {cartReducer &&
                      cartReducer.map((cart, index) => {
                        return (
                          <CheckoutItem
                            id={index}
                            itemName={cart.name}
                            price={cart.price}
                            priceUnit="$"
                            key={index}
                            qty={cart.quantity}
                            show={true}
                            minValue={0}
                            maxValue={7}
                            getValue={getQty}
                          />
                        );
                      })}
                  </div>
                  {cartReducer && cartReducer.length > 0 ? (
                    <>
                      {/* <div className="mb-2 bg-white rounded p-2 clearfix">
                        <Image
                          fluid
                          className="float-left"
                          src="/img/wallet-icon.png"
                        />
                        <h6 className="font-weight-bold text-right mb-2">
                          Subtotal : $
                          <span className="text-danger">{totalPrice}</span>
                        </h6>
                        <h6 className="text-right mb-2">
                          Delivery Fee: $
                          <span className="text-danger">
                            {singleResturant.deliveryfee}
                          </span>
                        </h6>
                        <h6 className="font-weight-bold text-right mb-2">
                          Total: $
                          <span className="text-danger">
                            {Number(totalPrice) +
                              Number(singleResturant.deliveryfee)}
                          </span>
                        </h6>
                        <p className="seven-color mb-1 text-right">
                      Extra charges may apply
                    </p>
                    <p className="text-black mb-0 text-right">
                      You have saved $955 on the bill
                    </p>
                      </div> */}

                      <div className="mb-2 bg-white rounded p-2 clearfix">
                        <p className="mb-1">
                          Sub Total
                          <span className="float-right text-dark">
                            ${totalPrice}
                          </span>
                        </p>
                        <p className="mb-1">
                          Delivery Fee
                          <OverlayTrigger
                            key="top"
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-top">
                                Total discount breakup
                              </Tooltip>
                            }>
                            <span className="text-info ml-1">
                              <Icofont icon="info-circle" />
                            </span>
                          </OverlayTrigger>
                          {singleResturant.deliveryfee > 0 ? (
                            <span className="float-right text-dark">
                              ${singleResturant.deliveryfee}
                            </span>
                          ) : (
                            <span className="float-right text-dark">0</span>
                          )}
                        </p>
                        {/* <p className="mb-1 text-success">
                          Total Discount
                          <span className="float-right text-success">
                            $1884
                          </span>
                        </p> */}
                        <hr />
                        <h6 className="font-weight-bold mb-0">
                          TO PAY{' '}
                          <span className="float-right">
                            ${' '}
                            {Number(totalPrice) +
                              Number(singleResturant.deliveryfee)}
                          </span>
                        </h6>
                      </div>
                      <div
                        onClick={onCheckout}
                        className="btn btn-success btn-block btn-lg">
                        Checkout
                        <Icofont icon="long-arrow-right" />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="pt-2"></div>
                  {/* <div className="alert alert-success" role="alert">
                    You have saved <strong>$1,884</strong> on the bill
                  </div> */}
                  <div className="pt-2"></div>
                  <div className="text-center pt-2">
                    <Image
                      fluid
                      src="https://dummyimage.com/352x504/ccc/ffffff.png&text=Google+ads"
                    />
                  </div>
                  <div className="text-center pt-2">
                    <Image
                      fluid
                      src="https://dummyimage.com/352x504/ccc/ffffff.png&text=Google+ads"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Tab.Container>
    </>
  );
};

export default Detail;
