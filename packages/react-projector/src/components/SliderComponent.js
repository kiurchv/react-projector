import React from "react";
import PropTypes from "prop-types";

const SliderComponent = ({
  children,
  className,
  style,
  activeSlide,
  totalSlides
}) => (
  <div
    className={className}
    style={{
      overflow: "hidden",
      transition: "height ease .25s",
      ...style
    }}
  >
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "flex-start",
        width: `${100 * totalSlides}%`,
        transition: "transform ease .25s",
        transform: `translateX(-${100 / totalSlides * activeSlide}%)`
      }}
    >
      {children}
    </ul>
  </div>
);

SliderComponent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  activeSlide: PropTypes.number,
  totalSlides: PropTypes.number,
  prevSlide: PropTypes.func,
  nextSlide: PropTypes.func,
  goToSlide: PropTypes.func,
  setStyle: PropTypes.func
};

export default SliderComponent;
