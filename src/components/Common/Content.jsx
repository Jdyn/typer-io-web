import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";

const propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Defines the `margin` style property.
   */
  margin: PropTypes.string,
  /**
   * Defines the `font-size` style property.
   */
  fontSize: PropTypes.number,
  /**
   * Defines the `font-weight` style property.
   */
  fontWeight: PropTypes.number,
  /**
   * Defines the `color` style property.
   */
  color: PropTypes.string
};

const Content = ({ children, classes }) => (
  <p className={classes.content}>{children}</p>
);

Content.propTypes = propTypes;
Content.defaultProps = {
  margin: "0",
  fontSize: 14,
  fontWeight: 400
};

const styles = {
  content: {
    margin: props => props.margin,
    fontSize: props => props.fontSize,
    fontWeight: props => props.fontWeight,
    color: props => props.color || "black"
  }
};

export default injectSheet(styles)(Content);
