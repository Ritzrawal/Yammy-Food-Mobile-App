import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Media } from 'react-bootstrap';
import Icofont from 'react-icofont';
import PropTypes from 'prop-types';

class ChooseAddressCard extends React.Component {
  render() {
    const { address, title } = this.props;
    console.log('address as props', address);
    return (
      <Card className={'bg-white addresses-item mb-4 ' + this.props.boxClass}>
        <div className="gold-members p-4">
          <Media>
            <div className="mr-3">
              <Icofont
                icon={this.props.icoIcon}
                className={this.props.iconclassName}
              />
            </div>
            <div className="media-body">
              <h6 className="mb-1 text-secondary">{title}</h6>
              <p className="text-black">
                {`${address && address.city} , ${address && address.country}
                ${address && address.line1} , ${address && address.line2}
                ${address && address.postalCode} , ${address && address.phone}`}
              </p>
              <p></p>
              <p className="mb-0 text-black font-weight-bold">
                {this.props.type === 'hasAddress' ? (
                  <>
                    <Link
                      className="btn btn-sm btn-success mr-2"
                      to="#"
                      onClick={this.props.onDeliverHereClick}>
                      {' '}
                      DELIVER HERE{' '}
                    </Link>
                    {/* <span>30MIN</span> */}
                  </>
                ) : (
                  <Link
                    className="btn btn-sm btn-primary mr-2"
                    to="#"
                    onClick={this.props.onAddNewClick}>
                    {' '}
                    ADD NEW ADDRESS{' '}
                  </Link>
                )}
              </p>
            </div>
          </Media>
        </div>
      </Card>
    );
  }
}

ChooseAddressCard.propTypes = {
  title: PropTypes.string.isRequired,
  icoIcon: PropTypes.string.isRequired,
  iconclassName: PropTypes.string,
  address: PropTypes.string,
  onDeliverHere: PropTypes.func,
  onAddNewClick: PropTypes.func,
  type: PropTypes.string.isRequired,
};

ChooseAddressCard.defaultProps = {
  type: 'hasAddress',
};

export default ChooseAddressCard;
