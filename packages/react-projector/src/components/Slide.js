import React from "react";
import PropTypes from "prop-types";

import SlideComponent from "./SlideComponent";

const Slide = (
  { component: Component = SlideComponent, children, className, index },
  context
) => (
  <Component className={className} index={index} {...context}>
    {children}
  </Component>
);

Slide.propTypes = {
  component: PropTypes.any,
  children: PropTypes.node,
  className: PropTypes.string
};

Slide.contextTypes = {
  activeSlide: PropTypes.number,
  totalSlides: PropTypes.number,
  prevSlide: PropTypes.func,
  nextSlide: PropTypes.func,
  goToSlide: PropTypes.func,
  setStyle: PropTypes.func
};

export default Slide;
