import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SlideComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    index: PropTypes.number,
    activeSlide: PropTypes.number,
    totalSlides: PropTypes.number,
    prevSlide: PropTypes.func,
    nextSlide: PropTypes.func,
    goToSlide: PropTypes.func,
    setStyle: PropTypes.func
  };

  componentDidMount() {
    this.setParentStyle();
  }

  render() {
    const { children, className } = this.props;

    return (
      <li
        ref={e => (this.slideRef = e)}
        className={className}
        style={{ flexBasis: "100%", overflow: "hidden" }}
      >
        {children}
      </li>
    );
  }

  setParentStyle() {
    const { activeSlide, index, setStyle } = this.props;
    const { height } = this.slideRef.getBoundingClientRect();

    setStyle(index, { height });
  }
}
