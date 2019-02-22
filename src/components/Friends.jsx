import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Friends = props => {
  return <div>Friends</div>;
};

const styles = {};

Friends.propTypes = propTypes;

export default withStyles(styles)(Friends);
