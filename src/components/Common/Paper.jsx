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
   * Defines the `background-color` style property.
   */
  color: PropTypes.string
};

const Paper = ({ children, classes }) => (
  <div className={classes.paper}>{children}</div>
);

Paper.propTypes = propTypes;
Paper.defaultProps = {
  margin: "15px",
  padding: "0"
};

const styles = theme => ({
  paper: props => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "auto",
    height: "100%",
    borderRadius: 8,
    boxShadow: "0px 5px 30px 5px rgba(50, 50, 93, .25)",
    margin: props.margin,
    padding: props.padding,
    backgroundColor: props.color || theme.primaryWhite
  })
});

export default withStyles(styles)(Paper);
