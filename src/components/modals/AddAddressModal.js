import React, { useEffect, useState } from 'react';
import {
  Form,
  InputGroup,
  Modal,
  ButtonToolbar,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import Icofont from 'react-icofont';
import { useSelector, useDispatch } from 'react-redux';
import { setShippingAddress } from '../../store/redux/checkout/redux';
import { updateUserShippingAddress } from '../../store/redux/user/redux';
import { setUserData } from '../../store/redux/auth/auth';

const AddAddressModal = (props) => {
  const dispatch = useDispatch();
  const iamUser = localStorage.getItem('currentUser');

  // const [city, setCity] = useState('');
  // const [country, setCountry] = useState('');
  // const [line1, setLine1] = useState('');
  // const [line2, setLine2] = useState('');
  // const [postalCode, setPostalCode] = useState('');

  const [form, setForm] = useState({
    city: '',
    line2: '',
    line1: '',
    country: '',
    postalCode: '',
  });

  const currentUser = useSelector((state) => state.auth.user);
  const reduxShippingAddress = useSelector(
    (state) => state.checkout.shippingAddress,
  );

  const setValue = (e) => {
    console.log('event', e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // const { name, value } = e;
  };

  useEffect(() => {
    console.log('props address', props.address);
    var savedAddress = props && props.address;
    if (savedAddress) {
      setForm({
        ...form,
        city: savedAddress.city,
        line1: savedAddress.line1,
        line2: savedAddress.line2,
        country: savedAddress.country,
        postalCode: savedAddress.postalCode,
      });
    }
  }, [props.show]);

  const allFieldsCompleted = () => {
    if (form.city === '') {
      return false;
    } else if (form.country === '') {
      return false;
    } else if (form.line1 === '') {
      return false;
    } else if (form.line2 === '') {
      return false;
    } else if (form.postalCode === '') {
      return false;
    }

    return true;
  };

  const onSaveAddressPress = async () => {
    if (!allFieldsCompleted()) {
    }

    try {
      if (currentUser.phone) {
        form.phone = currentUser.phone;
      }
      if (currentUser.email) {
        form.email = currentUser.email;
      }

      storeUserShippingAddress(form);
      dispatch(setShippingAddress(form));
    } catch (error) {
      // alert(error.message);
      console.log(error);
    }
  };

  const storeUserShippingAddress = (address) => {
    updateUserShippingAddress(iamUser, address);
    // Optimistically update local user object in redux with the new address
    dispatch(
      setUserData({ user: { ...currentUser, shippingAddress: address } }),
    );
    props.onHide();
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton={true}>
        <Modal.Title as="h5" id="add-address">
          Add Delivery Address
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <div className="form-row">
            <Form.Group className="col-md-12">
              <Form.Label htmlFor="line1">Line 1</Form.Label>
              <Form.Control
                type="text"
                name="line1"
                value={form.line1}
                onChange={(e) => setValue(e)}
                placeholder="Line 1"
              />
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>Line 2</Form.Label>
              <Form.Control
                type="text"
                name="line2"
                placeholder={'Apt #6400'}
                value={form.line2}
                onChange={(e) => setValue(e)}
              />
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="text"
                placeholder={'94102'}
                value={form.postalCode}
                name="postalCode"
                onChange={(e) => setValue(e)}
              />
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder={'London'}
                value={form.city}
                name="city"
                onChange={(e) => setValue(e)}
              />
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder={'United States'}
                value={form.country}
                name="country"
                onChange={(e) => setValue(e)}
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <div className="button-customize">
          <Button
            type="button"
            onClick={props.onHide}
            variant="outline-primary"
            className="d-flex w-50 text-center justify-content-center">
            CANCEL
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={onSaveAddressPress}
            className="d-flex w-50 text-center justify-content-center">
            SUBMIT
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default AddAddressModal;
