import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

class EditProfileModal extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="sm"
        centered>
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
                  defaultValue={this.props.firstName}
                  placeholder="Enter First Name"
                />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Label>Last Name </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.props.lastName}
                  placeholder="Enter Email id
                        "
                />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.props.email}
                  placeholder="Enter Email id"
                />
              </Form.Group>
              <Form.Group className="col-md-12 mb-0">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={this.props.phone}
                  placeholder="Enter password"
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            onClick={this.props.onHide}
            variant="outline-primary"
            className="d-flex w-50 text-center justify-content-center">
            CANCEL
          </Button>
          <Button
            type="button"
            variant="primary"
            className="d-flex w-50 text-center justify-content-center">
            UPDTAE
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default EditProfileModal;
