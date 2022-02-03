import React, { useState, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel3';
import MayLikeItem from './MayLikeItem';
import { getCaterogies } from '../../helpers/api.request';

const ItemsCarousel = () => {
  const [categories, seCategories] = useState('');

  useEffect(() => {
    getCateroriesData();
  }, []);

  const getCateroriesData = async () => {
    const { data, error } = await getCaterogies();
    if (error) {
      return console.log(error);
    }
    seCategories(data.categories);
    // console.log('hello data', data.restaurants);
  };

  return (
    <OwlCarousel
      nav
      loop
      {...options}
      className="owl-theme owl-carousel-five offers-interested-carousel">
      {categories &&
        categories.map((category, index) => {
          return (
            <div className="item" key={index}>
              <MayLikeItem
                title={category.title}
                image={category.photo}
                imageClass="img-fluid"
                imageAlt="carousel"
              />
            </div>
          );
        })}
    </OwlCarousel>
  );
};

const options = {
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
    1200: {
      items: 5,
    },
  },
  lazyLoad: true,
  pagination: 'false',
  loop: true,
  dots: false,
  autoPlay: 2000,
  nav: true,
  navText: [
    "<i class='icofont-thin-left'></i>",
    "<i class='icofont-thin-right'></i>",
  ],
};

export default ItemsCarousel;
