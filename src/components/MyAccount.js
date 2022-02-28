import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import { Row, Col, Container, Image } from 'react-bootstrap';
import Offers from './myaccount/Offers';
import Orders from './myaccount/Orders';
import Favourites from './myaccount/Favourites';
import Payments from './myaccount/Payments';
import Addresses from './myaccount/Addresses';

import { getUsers } from '../helpers/api.request';
import EditProfileModal from './modals/EditProfileModal';

class MyAccount extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: '',
      showEditProfile: false,
    };
  }
  hideEditProfile = () => this.setState({ showEditProfile: false });

  componentDidMount = () => {
    this.getUserOrders();
  };

  getUserOrders = async () => {
    const currentUser = localStorage.getItem('currentUser');

    const { error, data } = await getUsers();

    if (error) {
      console.log(error);
    }

    console.log('users list  ', data);

    const users =
      data &&
      data.users
        .filter((user) => user.id === currentUser)
        .map((userId) => {
          return userId;
        });
    console.log('entry users', users[0]);
    this.setState({ user: users[0] });
  };

  render() {
    return (
      <>
        <EditProfileModal
          firstName={this.state.user.firstName}
          lastName={this.state.user.lastName}
          email={this.state.user.email}
          phone={this.state.user.phone}
          show={this.state.showEditProfile}
          onHide={this.hideEditProfile}
        />
        <section className="section pt-4 pb-4 osahan-account-page">
          <Container>
            <Row>
              <Col md={3}>
                <div className="osahan-account-page-left shadow-sm bg-white h-100">
                  <div className="border-bottom p-4">
                    <div className="osahan-user text-center">
                      <div className="osahan-user-media">
                        <Image
                          className="mb-3 rounded-pill shadow-sm mt-1"
                          src="/img/user/4.png"
                          alt="gurdeep singh osahan"
                        />
                        <div className="osahan-user-media-body">
                          <h6 className="mb-2">
                            {this.state.user.firstName}{' '}
                            {this.state.user.lastName}
                          </h6>
                          <p className="mb-1">{this.state.user.phone}</p>
                          <p>{this.state.user.email}</p>
                          <p className="mb-0 text-black font-weight-bold">
                            <Link
                              to="#"
                              onClick={() =>
                                this.setState({ showEditProfile: true })
                              }
                              className="text-primary mr-3">
                              <i className="icofont-ui-edit"></i> EDIT
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <ul className="nav flex-column border-0 pt-4 pl-4 pb-4">
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/orders">
                        <i className="icofont-food-cart"></i> Orders
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/offers">
                        <i className="icofont-sale-discount"></i> Offers
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/favourites">
                        <i className="icofont-heart"></i> Favourites
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/payments">
                        <i className="icofont-credit-card"></i> Payments
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        exact
                        to="/myaccount/addresses">
                        <i className="icofont-location-pin"></i> Addresses
                      </NavLink>
                    </li>
                  </ul> */}
                </div>
              </Col>
              <Col md={9}>
                <Switch>
                  <Route path="/myaccount/orders" exact component={Orders} />
                  <Route path="/myaccount/offers" exact component={Offers} />
                  <Route
                    path="/myaccount/favourites"
                    exact
                    component={Favourites}
                  />
                  <Route
                    path="/myaccount/payments"
                    exact
                    component={Payments}
                  />
                  <Route
                    path="/myaccount/addresses"
                    exact
                    component={Addresses}
                  />
                </Switch>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default MyAccount;
