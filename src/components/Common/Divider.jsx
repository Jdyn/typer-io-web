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
   * Defines the `flex-shrink` style property.
   */
  flexShrink: PropTypes.number,
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
  height: "1px",
  margin: "0",
  border: "none",
  flexShrink: 0
};

const styles = theme => ({
  divider: props => (-{
    height: props.height,
    margin: props.margin,
    border: props.border,
    flexShrink: props.flexShrink,
    backgroundColor: props.color || theme.divider
  })
});

export default withStyles(styles)(Divider);
