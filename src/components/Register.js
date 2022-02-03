import React, { useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';

import { registerUser } from '../store/redux/auth/actions';

const Register = () => {
  const [formData, setFormData] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const history = useHistory();

  const create = async (data, setSubmitting) => {
    // console.log(JSON.stringify(data));
    setFormData(data);
    setIsLoading(true);
    dispatch(registerUser(data, history, dispatch));
    setSubmitting(false);
    setIsLoading(false);
  };

  return (
    <Container fluid className="bg-white">
      <Row>
        <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
        <Col md={8} lg={6}>
          <div className="login d-flex align-items-center py-5">
            <Container>
              <Row>
                <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                  <h3 className="login-heading mb-4">New Buddy!</h3>
                  <Formik
                    initialValues={formData}
                    validate={(values) => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = 'Email is Required';
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email,
                        )
                      ) {
                        errors.email = 'Invalid email address';
                      }
                      if (!values.password) {
                        errors.password = 'Password is Required';
                      }
                      if (!values.confirmPassword) {
                        errors.confirmPassword = 'Confirm Password is Required';
                      } else if (values.confirmPassword != values.password) {
                        errors.confirmPassword = "Passwords didn't match!";
                      }
                      if (!values.firstName) {
                        errors.firstName = 'First Name is Required';
                      }
                      if (!values.lastName) {
                        errors.lastName = 'Last Name is Required';
                      }
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      create(values, setSubmitting);
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
                      <form onSubmit={handleSubmit}>
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
                          <label className="FormLabel">First Name</label>
                          <input
                            className="FormTextField"
                            type="firstName"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                          />
                          <p className="ErrorMessage">
                            {errors.firstName &&
                              touched.firstName &&
                              errors.firstName}
                            {auth && auth.errors && auth.errors.firstName}
                          </p>
                        </div>

                        <div className="FormFieldContainer">
                          <label className="FormLabel">Last Name</label>
                          <input
                            className="FormTextField"
                            type="lastName"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                          />
                          <p className="ErrorMessage">
                            {errors.lastName &&
                              touched.lastName &&
                              errors.lastName}
                            {auth && auth.errors && auth.errors.lastName}
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

                        <div className="FormFieldContainer">
                          <label className="FormLabel">Confirm Password</label>
                          <input
                            className="FormTextField"
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                          />
                          <p className="ErrorMessage">
                            {errors.confirmPassword &&
                              touched.confirmPassword &&
                              errors.confirmPassword}
                            {auth && auth.errors && auth.errors.confirmPassword}
                          </p>
                        </div>

                        <div>
                          <Button
                            className="btn btn-lg btn-outline-primary btn-block  text-white btn-login text-uppercase font-weight-bold mb-2"
                            type="submit"
                            disabled={isSubmitting}>
                            Create account
                          </Button>
                        </div>
                        <div className="text-center pt-3">
                          Already have an account?{' '}
                          <Link className="font-weight-bold" to="/login">
                            Sign In
                          </Link>
                        </div>
                      </form>
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

export default Register;
