import React, { Component } from "react";
import PropTypes from "prop-types";
import ResizeObserver from "resize-observer-polyfill";

export default class ResponsiveSlide extends Component {
  componentWillMount() {
    this.resizeObserver = new ResizeObserver(this.setParentStyle);
  }

  componentDidMount() {
    this.resizeObserver.observe(this.slideRef);
  }

  componentWillUnmount() {
    this.resizeObserver.disconnect();
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

  setParentStyle = ([{ contentRect: { height } }]) => {
    const { index, setStyle } = this.props;

    setStyle(index, { height });
  };
}
