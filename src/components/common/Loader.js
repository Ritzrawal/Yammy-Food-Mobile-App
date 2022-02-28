import React from 'react';
import './styles/skeleton.css';
import { Row } from 'react-bootstrap';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const ImageLoader = (props) => {
  const n = 8;
  return (
    <>
      <Row>
        {[...Array(n)].map((elementInArray, index) => (
          <>
            <Skeleton className="skeleton-image-container" />
            <Skeleton className="skeleton-title-container" />
            <Skeleton className="skeleton-subtitle-container" />
            <Skeleton className="skeleton-last" />
            <Skeleton className="skeleton-last" />
            <Skeleton className="skeleton-last" />
            <Skeleton
              containerClassName="skeleton-last-price-container"
              className="skeleton-last-price"
            />
          </>
        ))}
      </Row>
    </>
  );
};

export const SkeletonProduct = () => {
  return (
    <div className="skeleton-wrapper">
      <Skeleton type="thumbnail" />
      <Skeleton type="text-lg" />
      <Skeleton type="text-md" />
      <Skeleton type="text-sm" />
      <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div>
    </div>
  );
};
