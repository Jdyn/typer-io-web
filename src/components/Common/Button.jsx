import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";

// TODO: Need to update prop-types for this component.

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

const Button = ({ children, classes, onClick }) => (
  <button onClick={onClick} className={classes.button}>
    {children}
  </button>
);

Button.propTypes = propTypes;
Button.defaultProps = {
  margin: "0",
  width: "155px",
  fontSize: 15,
  fontWeight: 600,
  padding: "10px"
};

const styles = theme => ({
  button: props => ({
    margin: props.margin,
    width: props.width,
    color: props.color,
    backgroundColor: props.backgroundColor,
    fontSize: props.fontSize,
    padding: props.padding,
    borderColor: theme.divider,
    cursor: "pointer",
    outline: "none",
    fontWeight: 600,
    border: "2px solid",
    borderRadius: 4,
    letterSpacing: ".025em",
    textTransform: "uppercase",
    transitionDuration: ".15s",
    "&:hover": {
      transform: "translateY(-2px)"
    },
    "&:active": {
      color: props.activeColor,
      transform: "translateY(2px)"
    }
  })
});

export default withStyles(styles)(Button);
