import React from "react";
import injectSheet from "react-jss";

const styles = {
  commonTitle: {
    margin: [0, 0, "5px"],
    whiteSpace: "normal",
    fontSize: 18,
    lineHeight: "15px",
    color: props => props.color ? props.color : 'red',
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: ".025em"
  }
};

const CommonTitle = injectSheet(styles)(({ classes, children }) => (
  <h2 className={classes.commonTitle}>{children}</h2>
));

export default CommonTitle;
