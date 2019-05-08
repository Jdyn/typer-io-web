import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const TextBox = props => (
  <textarea
    placeholder={props.placeholder}
    onClick={props.onClick}
    onChange={props.onChange}
    value={props.value}
    className={props.classes.container}
  />
);

const styles = {
  container: props => ({
    fontSize: 17,
    lineHeight: "24px",
    padding: "15px",
    border: "2px solid #e5e5e5",
    margin: "15px 0",
    overFlow: "auto",
    whiteSpace: "pre-wrap",
    width: "100%",
    borderRadius: 6,
    resize: "vertical",
    outline: "none",
    backgroundColor: "#fafafa",
    height: props.height
  })
};

TextBox.propTypes = propTypes;

export default withStyles(styles)(TextBox);
