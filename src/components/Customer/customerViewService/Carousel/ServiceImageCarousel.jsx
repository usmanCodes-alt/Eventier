import React, { useState } from "react";

import { Icon } from "@iconify/react";
import "./serviceImageCarousel.css";

const ServiceImageCarousel = ({ staticURLs }) => {
  const [current, setCurrent] = useState(0);
  const length = staticURLs?.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const previousSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(staticURLs) || staticURLs.length === 0) {
    // no carousel
    return null;
  }

  return (
    <section className="carousel__container">
      {/*<IoArrowBackOutline
        className="carousel__left-arrow"
        onClick={previousSlide}
      />*/}
      <Icon
        icon="ic:baseline-arrow-left"
        className="carousel__left-arrow"
        onClick={nextSlide}
      />
      {staticURLs.map((url, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={index}
        >
          {index === current && (
            <img className="carousel__image" src={url} alt="service" />
          )}
        </div>
      ))}
      {/*<IoArrowForwardOutline
        className="carousel__right-arrow"
        onClick={nextSlide}
          />*/}
      <Icon
        icon="ic:baseline-arrow-right"
        className="carousel__right-arrow"
        onClick={nextSlide}
      />
    </section>
  );
};

export default ServiceImageCarousel;
