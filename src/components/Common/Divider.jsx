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
   * Defines the `height` style property.
   */
  height: PropTypes.string,
  /**
   * Defines the `border` style property.
   */
  border: PropTypes.string,
  /**
   * Defines the `width` style property.
   */
  width: PropTypes.string,
  /**
   * Defines the `color` style property.
   */
  color: PropTypes.string
};

const Divider = ({ children, classes }) => (
  <div className={classes.divider}>{children}</div>
);

Divider.propTypes = propTypes;
Divider.defaultProps = {
  height: "2px",
  margin: "0 auto 0 auto",
  border: "none",
  width: "65%",
};

const styles = theme => ({
  divider: props => ({
    height: props.height,
    margin: props.margin,
    width: props.width,
    border: props.border,
    flexShrink: props.flexShrink,
    backgroundColor: theme.divider
  })
});

export default withStyles(styles)(Divider);
