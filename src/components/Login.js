import React, { useState } from 'react';
import { Formik } from 'formik';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import FontAwesome from './common/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/redux/auth/actions';

import './component.css';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const login = (data, setSubmitting) => {
    console.log(error);
    // setFormData(data);
    dispatch(loginUser(data, history, dispatch));
    // if (error) {
    //   setSubmitting(true);
    // }
    // setSubmitting(true);
  };

  const onSignup = () => {
    history.push('/register');
  };

  return (
    <Container fluid className="bg-white">
      <Row>
        <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
        <Col md={8} lg={6}>
          <div className="login d-flex align-items-center py-5">
            <Container className="container-customize">
              <Row>
                <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                  <Formik
                    isValidating={true}
                    initialValues={formData}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = 'This field is required';
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email,
                        )
                      ) {
                        errors.email = 'Invalid email address';
                      }
                      if (!values.password) {
                        errors.password = 'This field is required';
                      }
                      setError(errors);
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      login(values, setSubmitting);
                    }}>
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <div className="FormFieldContainer">
                          <label className="FormLabel">E-mail</label>
                          <input
                            className="FormTextField"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <p className="ErrorMessage">
                            {errors.email && touched.email && errors.email}
                            {auth && auth.errors && auth.errors.email}
                          </p>
                        </div>

                        <div className="FormFieldContainer">
                          <label className="FormLabel">Password</label>
                          <input
                            className="FormTextField"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <p className="ErrorMessage">
                            {errors.password &&
                              touched.password &&
                              errors.password}
                            {auth && auth.errors && auth.errors.password}
                          </p>
                        </div>

                        <div>
                          <Button
                            className="btn btn-lg btn-outline-primary btn-block btn-login  text-white text-uppercase font-weight-bold mb-2"
                            type="submit"
                            disabled={isSubmitting}>
                            Log in
                          </Button>
                        </div>
                        <div className="text-center pt-3">
                          Don’t have an account?{' '}
                          <Link className="font-weight-bold" to="/register">
                            Sign Up
                          </Link>
                        </div>
                        {/* <hr className="my-4" />
                        <p className="text-center">LOGIN WITH</p>
                        <div className="row">
                          <div className="col pr-2">
                            <Button className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase">
                              <FontAwesome icon="google" className="mr-2" />{' '}
                              Google
                            </Button>
                          </div>
                          <div className="col pl-2">
                            <Button className="btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase">
                              <FontAwesome icon="facebook" className="mr-2" />{' '}
                              Facebook
                            </Button>
                          </div>
                        </div> */}
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
