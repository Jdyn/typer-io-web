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
   * Defines the `width` style property.
   */
  width: PropTypes.string,
  /**
   * Defines the `padding` style property.
   */
  padding: PropTypes.string
};

const Input = ({ children, classes, ...props }) => (
  <input
    onChange={props.onChange}
    value={props.value}
    type={props.type || "text"}
    placeholder={props.placeholder}
    className={classes.input}
    autoComplete={props.autoComplete}
  >
    {children}
  </input>
);

Input.propTypes = propTypes;
Input.defaultProps = {
  margin: "0 0 10px 0",
  fontSize: 15,
  fontWeight: 600,
  width: "100%",
  padding: "10px",
};

const styles = theme => ({
  input: props => ({
    width: props.width,
    margin: props.margin,
    backgroundColor: theme.primaryWhite,
    padding: props.padding,
    color: props.color,
    border: "none",
    height: "42px",
    borderRadius: 4,
    boxShadow: `0px 0px 0px 1.5px ${theme.grey}`,
    fontSize: 18,
    outline: "none"
  })
});

export default withStyles(styles)(Input);
