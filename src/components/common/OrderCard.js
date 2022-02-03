import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Media } from 'react-bootstrap';
import Icofont from 'react-icofont';

const OrderCard = (props) => {
  const time_convert = (num) => {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    if (hours === 0) {
      return minutes + ' Min';
    } else if (minutes === 0) {
      return hours + ' Hour';
    } else {
      return hours + ' Hour ' + minutes + ' Min';
    }
  };

  console.log('props from order', props);

  return (
    <div className="bg-white card mb-4 order-list shadow-sm">
      <div className="gold-members p-4">
        <Media>
          <Image
            className="mr-4"
            src={props.orderProducts && props.orderProducts.photo}
            alt={props.imageAlt}
          />
          <Media.Body>
            {props.deliveredDate ? (
              <span className="float-right text-info">
                Delivered on {time_convert(props.deliveredDate)}
                <Icofont icon="check-circled" className="text-success ml-1" />
              </span>
            ) : (
              ''
            )}
            <h6 className="mb-2">
              {props.orderProducts && props.orderProducts.name}
            </h6>
            <p className="text-gray mb-1">
              <Icofont icon="location-arrow" /> {props.address}
            </p>
            <p className="text-gray mb-3">
              <Icofont icon="list" /> ORDER #{props.orderNumber}
              <Icofont icon="clock-time" className="ml-2" /> {props.orderDate}
            </p>
            <p className="text-dark">
              {props.vendor && props.vendor.description}
            </p>
            <hr />
            <div className="float-right">
              <Link
                className="btn btn-sm btn-outline-primary mr-1"
                to={props.helpLink}>
                <Icofont icon="headphone-alt" /> HELP
              </Link>
              <Link className="btn btn-sm btn-primary" to={props.detailLink}>
                <Icofont icon="refresh" /> REORDER
              </Link>
            </div>
            <p className="mb-0 text-black text-primary pt-2">
              <span className="text-black font-weight-bold"> Total Paid:</span>{' '}
              {props.orderTotal && props.orderTotal.newTotal}
            </p>
          </Media.Body>
        </Media>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  orderNumber: PropTypes.string,
  orderDate: PropTypes.string,
  deliveredDate: PropTypes.string,
  orderTitle: PropTypes.string,
  address: PropTypes.string,
  orderProducts: PropTypes.array,
  helpLink: PropTypes.string,
  detailLink: PropTypes.string,
  orderTotal: PropTypes.any,
};
export default OrderCard;
