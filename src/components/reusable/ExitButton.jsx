import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";

const propTypes = {
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

const exitButton = ({ classes, onClick }) => (
  <button className={classes.button} onClick={onClick}>
    <svg className={classes.svg} width="35" height="35" viewBox="0 0 25 25">
      <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
    </svg>
  </button>
);

exitButton.propTypes = propTypes;
exitButton.defaultProps = {};

const styles = {
  button: {
    height: "32px",
    width: "32px",
    padding: 0,
    margin: "0 0 0 auto",
    border: "none",
    outline: "none",
    cursor: "pointer",
    background: "transparent",
    transitionDuration: ".15s",
    "&:hover": {
      transform: "translateY(-2px)"
    },
    "&:active": {
      color: "",
      transform: "translateY(2px)"
    }
  },
  svg: {
    fill: "#6772e5"
  }
};

export default withStyles(styles)(exitButton);
