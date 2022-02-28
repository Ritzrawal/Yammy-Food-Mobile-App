import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Index from '../components/Index';
import Offers from '../components/Offers';
import MyAccount from '../components/MyAccount';
import List from '../components/List';
import NotFound from '../components/NotFound';
import Thanks from '../components/Thanks';
import Extra from '../components/Extra';
import Login from '../components/Login';
import Register from '../components/Register';
import TrackOrder from '../components/TrackOrder';
import Invoice from '../components/Invoice';
import Checkout from '../components/Checkout';
import Detail from '../components/Detail';
import getToken from '../helpers/getToken';
import PrivateRoute from './PrivateRoute';
import RestaurantList from '../components/RestaurantsList';
import StripeContainer from '../components/cart/StripeContainer';

import '../App.css';

const AppRoute = (props) => {
  return (
    <>
      {props.location.pathname !== '/login' &&
      props.location.pathname !== '/register' ? (
        <Header {...props} />
      ) : (
        ''
      )}
      <Switch>
        <PrivateRoute path="/" exact component={Index} />
        <Route path="/offers" exact component={Offers} />
        <Route path="/listing" exact component={List} />
        <Route path="/myaccount" component={MyAccount} />
        <Route path="/404" exact component={NotFound} />
        <Route path="/extra" exact component={Extra} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/track-order" exact component={TrackOrder} />
        <Route path="/invoice" exact component={Invoice} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/thanks" exact component={Thanks} />
        <Route path="/detail" exact component={Detail} />
        <Route path="/payment" exact component={StripeContainer} />
        <Route path="/restaurant-list" exact component={RestaurantList} />
        <Route exact component={NotFound} />
      </Switch>
      {props.location.pathname !== '/login' &&
      props.location.pathname !== '/register' ? (
        <Footer />
      ) : (
        ''
      )}
    </>
  );
};

export default AppRoute;
