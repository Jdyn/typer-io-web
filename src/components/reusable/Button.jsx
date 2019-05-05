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
   * Defines the `width` style property.
   */
  width: PropTypes.string
};

const Button = props => (
  <button
    onClick={props.onClick}
    className={props.secondary ? props.classes.secondary : props.classes.primary}
  >
    {props.children}
  </button>
);

Button.propTypes = propTypes;
Button.defaultProps = {
  margin: "0",
  width: "175px",
  height: "auto"
};

const styles = theme => ({
  button: {
    cursor: "pointer",
    outline: "none",
    fontWeight: 700,
    zIndex: 100,
    fontSize: 16,
    padding: "10px",
    borderRadius: 8,
    letterSpacing: ".025em",
    textTransform: "uppercase",
    transitionDuration: ".15s",
    "&:hover": {
      transform: "translateY(-2px)"
    },
    "&:active": {
      transform: "translateY(2px)"
    }
  },
  primary: {
    extend: "button",
    border: `2px solid rgba(0, 0, 0, 0.1)`,
    backgroundClip: "border-box",
    backgroundColor: theme.accent,
    color: theme.white,
    height: props => props.height,
    margin: props => props.margin,
    width: props => props.width,
    boxShadow: props => (props.noShadow ? "none" : "0 5px 20px rgba(35,35,80,.25)")
  },
  secondary: {
    extend: "button",
    border: `2px solid rgba(0, 0, 0, 0.1)`,
    backgroundClip: "border-box",
    backgroundColor: theme.white,
    color: theme.accent,
    height: props => props.height,
    margin: props => props.margin,
    width: props => props.width,
    boxShadow: props => (props.noShadow ? "none" : "0 5px 20px rgba(35,35,80,.25)")
  }
});

export default withStyles(styles)(Button);
