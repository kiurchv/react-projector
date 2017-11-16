import React, { Component, Children, cloneElement } from "react";
import PropTypes from "prop-types";

import SliderComponent from "./SliderComponent";

export default class Slider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    component: PropTypes.element,
    className: PropTypes.string,
    defaultSlide: PropTypes.number,
    activeSlide: PropTypes.number,
    onSlideChange: PropTypes.func,
    loop: PropTypes.bool
  };

  static childContextTypes = {
    activeSlide: PropTypes.number,
    totalSlides: PropTypes.number,
    prevSlide: PropTypes.func,
    nextSlide: PropTypes.func,
    goToSlide: PropTypes.func,
    setStyle: PropTypes.func
  };

  static defaultProps = {
    onSlideChange: () => {}
  };

  state = {
    activeSlide: this.getSlideIndex(this.props.defaultSlide) || 0,
    styles: {}
  };

  getChildContext() {
    return this.sliderProps;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeSlide !== prevState.activeSlide) {
      this.props.onSlideChange(this.state.activeSlide);
    }
  }

  render() {
    const {
      component: Component = SliderComponent,
      className,
      children
    } = this.props;

    const { styles } = this.state;

    const style = styles[this.activeSlide];

    return (
      <Component className={className} style={style} {...this.sliderProps}>
        {Children.map(children, (child, index) =>
          cloneElement(child, { index })
        )}
      </Component>
    );
  }

  get sliderProps() {
    const {
      activeSlide,
      totalSlides,
      prevSlide,
      nextSlide,
      goToSlide,
      setStyle
    } = this;

    return {
      activeSlide,
      totalSlides,
      prevSlide,
      nextSlide,
      goToSlide,
      setStyle
    };
  }

  get activeSlide() {
    return this.isControlled
      ? this.getSlideIndex(this.props.activeSlide)
      : this.state.activeSlide;
  }

  get isControlled() {
    return this.props.activeSlide !== undefined;
  }

  get totalSlides() {
    return Children.count(this.props.children);
  }

  prevSlide = () => {
    if (this.isControlled) {
      this.props.onSlideChange(this.getSlideIndex(this.props.activeSlide - 1));
    } else {
      this.setState(({ activeSlide }) => ({
        activeSlide: this.getSlideIndex(activeSlide - 1)
      }));
    }
  };

  nextSlide = () => {
    if (this.isControlled) {
      this.props.onSlideChange(this.getSlideIndex(this.props.activeSlide + 1));
    } else {
      this.setState(({ activeSlide }) => ({
        activeSlide: this.getSlideIndex(activeSlide + 1)
      }));
    }
  };

  goToSlide = slide => {
    const activeSlide = this.getSlideIndex(slide);

    if (this.isControlled) {
      this.props.onSlideChange(activeSlide);
    } else {
      this.setState({ activeSlide });
    }
  };

  getSlideIndex(slide) {
    const { loop } = this.props;
    const { totalSlides } = this;

    return loop
      ? (totalSlides + slide % totalSlides) % totalSlides
      : slide > 0 ? Math.min(slide, totalSlides - 1) : 0;
  }

  setStyle = (index, newStyle) => {
    this.setState(({ styles }) => ({
      styles: { ...styles, [index]: { ...styles[index], ...newStyle } }
    }));
  };
}
