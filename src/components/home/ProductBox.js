import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Image } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { setVendors } from '../../store/redux/vendors/actions';

const ProductBox = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onClickImage = () => {
    history.push('restaurant-list');
    console.log('vendor info', props.id);
    localStorage.setItem('vendorID', props.id);
    // dispatch(setVendors(props.singleVendor));
  };
  return (
    <div className={props.boxClass} onClick={onClickImage}>
      <Image
        src={props.image}
        className={props.imageClass}
        alt={props.imageAlt}
      />
      {props.title ? (
        <h6 className={props.titleClass}>{props.title.substring(0, 10)}</h6>
      ) : (
        ''
      )}
      {props.counting ? <p>{props.counting}</p> : ''}
    </div>
  );
};

ProductBox.propTypes = {
  linkUrl: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageClass: PropTypes.string,
  imageAlt: PropTypes.string,
  boxClass: PropTypes.string,
  title: PropTypes.string,
  counting: PropTypes.string,
  id: PropTypes.string,
};
ProductBox.defaultProps = {
  imageAlt: '',
  image: '',
  imageClass: '',
  linkUrl: '',
  boxClass: 'products-box',
  title: '',
  counting: '',
  id: '',
};

export default ProductBox;
