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
  width: PropTypes.width,
  /**
   * Defines the `padding` style property.
   */
  padding: PropTypes.padding
};

const Input = ({ children, classes, onChange, type, value, placeholder }) => (
  <input
    onChange={onChange}
    value={value}
    type={type || "text"}
    placeholder={placeholder}
    className={classes.input}
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
  padding: "10px"
};

const styles = theme => ({
  input: props => ({
    width: props.width,
    margin: props.margin,
    borderColor: theme.divider,
    backgroundColor: theme.primaryWhite,
    padding: props.padding,
    height: "42px",
    borderRadius: 8,
    border: "2px solid",
    fontSize: 18,
    outline: "none",
    backgroundImage: "none"
  })
});

export default withStyles(styles)(Input);
