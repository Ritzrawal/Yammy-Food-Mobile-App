import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;

  const isAuthenticated = () => {
    let isAuthenticated = false;

    const token = localStorage.getItem('jwtToken');

    if (token) {
      isAuthenticated = true;
    }

    return isAuthenticated;
  };

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthenticated() ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};
const mapStateToProps = (state) => ({
  prop: state.prop,
});

export default connect(mapStateToProps, {})(PrivateRoute);
