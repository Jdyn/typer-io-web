import React from "react";
import withStyles from "react-jss";

const ContextDisplay = props => {
  const { classes, snippet, difficultyColor } = props;
  return snippet.quote ? (
    <div className={classes.container}>
      <span className={classes.title}>{snippet.title}</span>
      <div className={classes.author}>By {snippet.author}</div>
      <span className={classes.difficulty}>
        Difficulty: {snippet.difficulty}
      </span>
    </div>
  ) : (
    <div className={classes.container} />
  );
};

const styles = theme => ({
  container: {
    height: "100%",
    padding: "10px",
    backgroundColor: theme.primaryWhite,//"#555abf",
    boxShadow: "0px 0px 15px 0px rgba(50,50,93,.25) inset",
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,.1)",
    zIndex: 150
  },
  title: {
    fontWeight: 600,
    fontSize: 24,
    color: "#525f7f",
    margin: "0 auto"
  },
  author: {
    fontWeight: 600,
    fontSize: 16,
    padding: "5px 0",
    color: "#24292e"
  },
  difficulty: props => ({
    backgroundColor: props.difficultyColor,
    borderRadius: 4,
    fontSize: 14,
    width: "auto",
    fontWeight: 600,
    border: "1px solid rgba(0,0,0,.1)",
    padding: "5px",
    boxShadow: "0px 0px 5px 0px rgba(50,50,93,.25) ",
    color: theme.primaryWhite
  })
});
export default withStyles(styles, { injectTheme: true })(ContextDisplay);
