import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Modal, Button } from 'react-bootstrap';
import { updateUserData } from '../../store/redux/user/redux';

const EditProfileModal = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  useEffect(() => {
    setUser({
      ...user,
      firstName: props.firstName,
      lastName: props.lastName,
      phone: props.phone,
    });
  }, [props]);

  const onChangeValue = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    const userID = localStorage.getItem('currentUser');
    updateUserData(userID, user);
    props.onHide();
  };

  return (
    <Modal show={props.show} onHide={props.onHide} size="sm" centered>
      <Modal.Header closeButton={true}>
        <Modal.Title as="h5" id="edit-profile">
          Edit profile
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <div className="form-row">
            <Form.Group className="col-md-12">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={onChangeValue}
                placeholder="Enter First Name"
              />
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>Last Name </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={onChangeValue}
                placeholder="Enter Last Name"
              />
            </Form.Group>
            <Form.Group className="col-md-12">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="text"
                name="email"
                disabled={true}
                defaultValue={props.email}
                onChange={onChangeValue}
                placeholder="Enter Email id"
              />
            </Form.Group>
            <Form.Group className="col-md-12 mb-0">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                onChange={onChangeValue}
                value={user.phone}
                placeholder="Enter Phone number"
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
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
          onClick={onSubmit}
          className="d-flex w-50 text-center justify-content-center">
          UPDTAE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default EditProfileModal;
