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
   * Defines whether a default 15px margin should be applied.
   */
  noMargin: PropTypes.bool
};

const Banner = ({ children, classes }) => (
  <div className={classes.container}>
    <h2>{children}</h2>
  </div>
);

Banner.propTypes = propTypes;

const styles = theme => ({
  container: props => ({
    display: "flex",
    alignItems: "center",
    border: "3px solid rgb(0,0,0,.1)",
    color: theme.white, // "#555abf",
    backgroundColor: "#555abf",
    margin: "-24px",
    padding: "12px",
    borderRadius: "16px 16px 0 0",
    boxShadow: "0 5px 10px 0px rgba(30,30,70,.3)",
    marginBottom: props.noMargin ? 0 : "15px",
    "& h2": {
      display: "Flex",
      fontWeight: 600,
      fontSize: 24,
      alignItems: "center",
      margin: 0,
      textAlign: "center"
    }
  })
});

export default withStyles(styles)(Banner);
