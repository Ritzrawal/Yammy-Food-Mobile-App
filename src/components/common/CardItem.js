import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Icofont from 'react-icofont';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { time_convert } from '../../helpers/helper';
import { setVendors } from '../../store/redux/vendors/actions';

const CardItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onClickImage = () => {
    history.push('detail');

    localStorage.setItem('vendorID', props.id);

    dispatch(setVendors(props.singleVendor));
  };

  return (
    <div className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
      <div className="list-card-image">
        {props.rating ? (
          <div className="star position-absolute">
            <Badge variant="success">
              <Icofont icon="star" /> {props.rating}
            </Badge>
          </div>
        ) : (
          ''
        )}
        <div
          className={`favourite-heart position-absolute ${props.favIcoIconColor}`}>
          <Link to={props.linkUrl}>
            <Icofont icon="heart" />
          </Link>
        </div>
        {props.showPromoted ? (
          <div className="member-plan position-absolute">
            <Badge variant={props.promotedVariant}>Promoted</Badge>
          </div>
        ) : (
          ''
        )}
        <div onClick={onClickImage} className="image-outer-container-homepage">
          <Image
            src={props.image}
            className={props.imageClass}
            alt={props.imageAlt}
          />
        </div>
      </div>
      <div className="p-3-position-relative">
        <div className="list-card-body">
          <h6 className="mb-1">
            <Link to={props.linkUrl} className="text-black">
              {props.title}
            </Link>
          </h6>
          {props.subTitle ? (
            <p className="text-gray mb-3">
              {props.subTitle.substring(0, 80)}...
            </p>
          ) : (
            ''
          )}
          {props.time || props.price ? (
            <p className="text-gray mb-3 time">
              {props.time ? (
                <span className="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2">
                  <Icofont icon="wall-clock" /> {time_convert(props.time)}
                </span>
              ) : (
                ''
              )}
              {props.price ? (
                <span className="float-right text-black-50">
                  {' '}
                  $ {props.price}
                </span>
              ) : (
                ''
              )}
            </p>
          ) : (
            ''
          )}
        </div>
        <div className="min-order-delivery-charge">
          {props.minamount && (
            <p className="float-right text-black-50">
              {' '}
              ${props.minamount} min order
            </p>
          )}
          {props.deliveryfee && (
            <p className="float-right text-black-50">
              ${props.deliveryfee} delivery fee
            </p>
          )}
        </div>
        {props.offerText ? (
          <div className="list-card-badge">
            <Badge variant={props.offerColor}>OFFER</Badge>{' '}
            <small>{props.offerText}</small>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string.isRequired,
  imageClass: PropTypes.string,
  linkUrl: PropTypes.string.isRequired,
  offerText: PropTypes.string,
  offerColor: PropTypes.string,
  subTitle: PropTypes.string,
  time: PropTypes.string,
  price: PropTypes.string,
  showPromoted: PropTypes.bool,
  promotedVariant: PropTypes.string,
  favIcoIconColor: PropTypes.string,
  rating: PropTypes.string,
};
CardItem.defaultProps = {
  imageAlt: '',
  imageClass: '',
  offerText: '',
  offerColor: 'success',
  subTitle: '',
  time: '',
  price: '',
  showPromoted: false,
  promotedVariant: 'dark',
  favIcoIconColor: '',
  rating: '',
};

export default CardItem;
