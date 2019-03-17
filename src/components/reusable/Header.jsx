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

const Header = ({ children, classes }) => <h2 className={classes.header}>{children}</h2>;

Header.propTypes = propTypes;

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    margin: 0,
    boxSizing: "border-box",
    fontSize: "24px",
    minHeight: "55px",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: "#555abf",
    boxShadow: "0 5px 20px rgba(35,35,80,.25)",
    borderRadius: "8px 8px 0px 0px"
  }
};

export default withStyles(styles)(Header);
