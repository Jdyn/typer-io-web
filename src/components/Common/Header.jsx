import React from "react";
import withStyles from "react-jss";
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
   * Defines extra style properties.
   */
  styles: PropTypes.object
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
  borderRadius: "8px",
  color: "black",
};

const styles = theme => ({
  header: props => ({
    margin: props.margin,
    padding: props.padding,
    fontSize: props.fontSize,
    fontWeight: props.fontWeight,
    color: props.color,
    height: props.height,
    backgroundColor: props.backgroundColor,
    borderRadius: props.borderRadius,
    border: props.border,
    boxShadow: props.boxShadow,
    justifyContent: "left",
    ...props.style
  })
});

export default withStyles(styles)(Header);
