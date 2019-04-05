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

const Banner = ({ children, classes }) => (
  <div className={classes.container}>
    <h2>{children}</h2>
  </div>
);

Banner.propTypes = propTypes;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    margin: 0,
    boxSizing: "border-box",
    minHeight: "60px",
    zIndex: 150,
    border: "3px solid rgb(0, 0, 0, .1)",
    backgroundColor: "#555abf",
    boxShadow: "0 5px 5px 0px rgba(35,35,80,.3)",
    borderRadius: "10px 10px 0px 0px",
    "& h2": {
      fontSize: 26,
      display: "Flex",
      fontWeight: 600,
      alignItems: "center",
      margin: 0,
      color: "#fff",
      textAlign: "center"
    }
  }
};

export default withStyles(styles)(Banner);
