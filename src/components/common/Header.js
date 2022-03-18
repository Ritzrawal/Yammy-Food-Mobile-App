import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
  Badge,
} from 'react-bootstrap';
import DropDownTitle from '../common/DropDownTitle';
import CartDropdownHeader from '../cart/CartDropdownHeader';
import CartDropdownItem from '../cart/CartDropdownItem';
import Icofont from 'react-icofont';
import { connect } from 'react-redux';
// import {useDispatch} from 'react-router-dom'
import { cart } from '../../store/redux/cart/reducers';
import { logoutUser } from '../../store/redux/auth/actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavExpanded: false,
      cartItems: [],
    };
  }
  setIsNavExpanded = (isNavExpanded) => {
    this.setState({ isNavExpanded: isNavExpanded });
  };
  closeMenu = () => {
    this.setState({ isNavExpanded: false });
  };

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      // if clicked inside menu do something
    } else {
      // If clicked outside menu, close the navbar.
      this.setState({ isNavExpanded: false });
    }
  };

  componentDidMount() {
    this.getCartItems();
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  getCartItems = () => {
    const items = JSON.parse(localStorage.getItem('@MySuperCart:key'));
    if (items) {
      this.setState({
        cartItems: items.cartItems,
      });
    }
  };

  onLogoutUser = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('vendorID');
    localStorage.removeItem('currentUser');
    // console.log('Props info', this.props);
    this.props.history.push('/login');
    // this.props.logoutUser(this.props.dispatch, this.props.history);
  };
  render() {
    return (
      <div ref={(node) => (this.node = node)}>
        <Navbar
          onToggle={this.setIsNavExpanded}
          expanded={this.state.isNavExpanded}
          color="light"
          expand="lg"
          className="navbar-light osahan-nav shadow-sm">
          <Container>
            <Navbar.Brand to="/">
              Yammy Logo
              {/* <Image src="/img/logo.png" alt="" /> */}
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav activeKey={0} className="ml-auto" onSelect={this.closeMenu}>
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/">
                  Home <span className="sr-only">(current)</span>
                </Nav.Link>
                <Nav.Link
                  eventKey={1}
                  as={NavLink}
                  activeclassname="active"
                  to="/listing">
                  Restaurants
                  {/* <Badge variant="danger">New</Badge> */}
                </Nav.Link>
                {/* <NavDropdown
                  title="Restaurants"
                  alignRight
                  className="border-0">
                  <NavDropdown.Item
                    eventKey={2.1}
                    as={NavLink}
                    activeclassname="active"
                    to="/listing">
                    Listing
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={2.2}
                    as={NavLink}
                    activeclassname="active"
                    to="/detail">
                    Detail + Cart
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={2.3}
                    as={NavLink}
                    activeclassname="active"
                    to="/checkout">
                    Checkout
                  </NavDropdown.Item>
                </NavDropdown> */}
                {/* <NavDropdown title="Pages" alignRight>
                  <NavDropdown.Item
                    eventKey={3.1}
                    as={NavLink}
                    activeclassname="active"
                    to="/track-order">
                    Track Order
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={3.2}
                    as={NavLink}
                    activeclassname="active"
                    to="/invoice">
                    Invoice
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={3.3}
                    as={NavLink}
                    activeclassname="active"
                    to="/login">
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={3.4}
                    as={NavLink}
                    activeclassname="active"
                    to="/register">
                    Register
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={3.5}
                    as={NavLink}
                    activeclassname="active"
                    to="/404">
                    404
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={3.6}
                    as={NavLink}
                    activeclassname="active"
                    to="/extra">
                    Extra
                  </NavDropdown.Item>
                </NavDropdown> */}

                {/* <NavDropdown
                  activeclassname="active"
                  alignRight
                  className="dropdown-cart"
                  title={
                    <DropDownTitle
                      className="d-inline-block"
                      faIcon="shopping-basket"
                      iconClass="mr-1"
                      title="Cart"
                      badgeClass="ml-1"
                      badgeVariant="success"
                      badgeValue={
                        this.state.cartItems
                          ? this.state &&
                            this.state.cartItems &&
                            this.state.cartItems.length
                          : 0
                      }
                    />
                  }>
                  <div className="dropdown-cart-top shadow-sm">
                    {
                      <CartDropdownHeader
                        className="dropdown-cart-top-header p-4"
                        title="Gus's World Famous Chicken"
                        subTitle="310 S Front St, Memphis, USA"
                        image="img/cart.jpg"
                        imageClass="img-fluid mr-3"
                        imageAlt="osahan"
                        NavLinkUrl="#"
                        NavLinkText="View Full Menu"
                      />
                    }
                    <div className="dropdown-cart-top-footer border-top p-4">
                      <p className="mb-0 font-weight-bold text-secondary">
                        Sub Total{' '}
                        <span className="float-right text-dark">$499</span>
                      </p>
                      <small className="text-info">
                        Extra charges may apply
                      </small>
                    </div>
                    <div className="dropdown-cart-top-footer border-top p-2">
                      <NavDropdown.Item
                        eventKey={5.1}
                        as={Link}
                        className="btn btn-success btn-block py-3 text-white text-center dropdown-item"
                        to="/checkout">
                        {' '}
                        Checkout
                      </NavDropdown.Item>
                    </div>
                  </div>
                </NavDropdown> */}
                {/* <Nav.Link
                  eventKey={1}
                  as={NavLink}
                  activeclassname="active"
                  to="/login">
                  <Icofont icon="user" /> Login
                </Nav.Link> */}
                <NavDropdown
                  alignRight
                  title={
                    <DropDownTitle
                      className="d-inline-block"
                      image="img/user/4.png"
                      imageAlt="user"
                      imageClass="nav-osahan-pic rounded-pill"
                      title="My Account"
                    />
                  }>
                  <NavDropdown.Item
                    eventKey={4.1}
                    as={NavLink}
                    activeclassname="active"
                    to="/myaccount/orders">
                    <Icofont icon="user-alt-4" /> Account Details
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={4.2}
                    as={NavLink}
                    activeclassname="active"
                    to="/myaccount/offers">
                    <Icofont icon="contacts" /> Contact Us
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={4.3}
                    as={NavLink}
                    activeclassname="active"
                    onClick={this.onLogoutUser}
                    to="/login">
                    <Icofont icon="logout" /> Log Out
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item
                    eventKey={4.4}
                    as={NavLink}
                    activeclassname="active"
                    to="/myaccount/payments">
                    <Icofont icon="credit-card" /> Payments
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    eventKey={4.5}
                    as={NavLink}
                    activeclassname="active"
                    to="/myaccount/addresses">
                    <Icofont icon="location-pin" /> Addresses
                  </NavDropdown.Item> */}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     cartItems: state.cart.cartItems || null,
//   };
// };

export default connect(null, { logoutUser })(Header);
