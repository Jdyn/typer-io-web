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
   * Defines the `padding` style property.
   */
  padding: PropTypes.string,
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
  color: PropTypes.string,
  /**
   * Defines the `background-color` style property.
   */
  backgroundColor: PropTypes.string,
  /**
   * Defines the `border-radius` style property.
   */
  borderRadius: PropTypes.borderRadius
};

const Header = ({ children, classes }) => (
  <h2 className={classes.header}>{children}</h2>
);

Header.propTypes = propTypes;
Header.defaultProps = {
  margin: "0",
  padding: "0",
  fontSize: 18,
  fontWeight: 600,
  borderRadius: 8,
};

const styles = theme => ({
  header: {
    margin: props => props.margin,
    padding: props => props.padding,
    fontSize: props => props.fontSize,
    fontWeight: props => props.fontWeight,
    color: props => props.color || "black",
    backgroundColor: props => props.backgroundColor,
    borderRadius: props => props.borderRadius,
    border: props => props.border,
    boxShadow: props => props.boxShadow,
    justifyContent: "left"
  }
});

export default injectSheet(styles)(Header);
