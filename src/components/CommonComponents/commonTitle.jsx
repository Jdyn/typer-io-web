import React from "react";
import injectSheet from "react-jss";

const styles = {
  commonTitle: {
    margin: props => (props.margin ? props.margin : "0px"),
    whiteSpace: "normal",
    fontSize: 18,
    lineHeight: "15px",
    color: props => (props.color ? props.color : "red"),
    padding: props => (props.padding ? props.padding : '0px'),
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: ".025em"
  }
};

const CommonTitle = injectSheet(styles)(({ classes, children }) => (
  <h2 className={classes.commonTitle}>{children}</h2>
));

export default CommonTitle;
