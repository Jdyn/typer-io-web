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
  fontSize: 15,
  fontWeight: 600,
  width: "155px",
  padding: "10px"
};

const styles = theme => ({
  button: props => ({
    width: props.width,
    margin: props.margin,
    borderColor: theme.divider,
    color: props.color,
    backgroundColor: props.backgroundColor,
    cursor: "pointer",
    outline: "none",
    padding: "10px",
    fontSize: 15,
    fontWeight: 600,
    border: "2px solid",
    borderRadius: 8,
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
  // button: {
  //   margin: props => props.margin,
  //   fontSize: props => props.fontSize,
  //   fontWeight: props => props.fontWeight,
  //   color: props => props.color || "black",
  //   padding: props => props.padding,
  //   width: props => props.width,
  //   backgroundColor: props => props.backgroundColor || theme.primaryWhite,
  //   cursor: "pointer",
  //   outline: "none",
  //   border: "none",
  //   letterSpacing: ".025em",
  //   textTransform: "uppercase",
  //   borderRadius: 8,
  //   boxShadow: "0px 5px 10px 0px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)",
  //   transitionDuration: ".15s",
  //   "&:hover": {
  //     transform: "translateY(-1px)",
  //     boxShadow: "0 7px 14px rgba(50,50,93,.1),0 3px 6px rgba(0,0,0,.08)"
  //   },
  //   "&:active": {
  //     transform: "translateY(1px)",
  //     boxShadow: "0 6px 12px -2px rgba(50,50,93,.25),0 3px 7px -3px rgba(0,0,0,.3)"
  //   }
  // }
});

export default withStyles(styles)(Button);
