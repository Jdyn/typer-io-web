import React from "react";
import injectSheet from "react-jss";

const styles = {
  commonTitle: {
    margin: props => (props.margin ? props.margin : "0px"),
    fontSize: props => (props.fontSize ? props.fontSize : 18),
    color: props => (props.color ? props.color : "black"),
    padding: props => (props.padding ? props.padding : '0px'),
    fontWeight: 600,
  }
};

const CommonTitle = injectSheet(styles)(({ classes, children }) => (
  <h2 className={classes.commonTitle}>{children}</h2>
));

export default CommonTitle;
