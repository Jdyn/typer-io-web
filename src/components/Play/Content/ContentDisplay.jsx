import React from "react";
import withStyles from "react-jss";

const ContextDisplay = props => {
  const { classes, snippet, difficultyColor } = props;
  return snippet.quote ? (
    <div className={classes.container}>
      <span className={classes.title}>{snippet.title}</span>
      <div className={classes.author}>By {snippet.author}</div>
      <span className={classes.difficulty}>{snippet.difficulty}</span>
    </div>
  ) : (
    <div className={classes.container} />
  );
};

const styles = theme => ({
  container: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "1fr min-content",
    height: "100%",
    padding: "10px",
    backgroundColor: "#555abf",
    boxShadow: "0px 0px 30px rgba(50,50,93,.25)",
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,.1)",
    zIndex: 150
  },
  title: {
    fontWeight: 600,
    fontSize: 24,
    color: theme.primaryWhite, //"#525f7f",
    paddingBottom: "5px",
    margin: "0 auto",
    gridRow: "1 / 2",
    gridColumn: "1 / 3"
  },
  author: {
    fontWeight: 600,
    fontSize: 16,
    paddingRight: "15px",
    color: theme.primaryWhite //"#24292e"
  },
  difficulty: props => ({
    backgroundColor: props.difficultyColor,
    borderRadius: 4,
    fontSize: 14,
    width: "auto",
    lineHeight: "5px",
    height: "20px",
    fontWeight: 600,
    letterSpacing: ".025em",
    border: "1px solid rgba(0,0,0,.1)",
    padding: "5px",
    margin: "auto",
    boxShadow: "0px 0px 5px 0px rgba(50,50,93,.25) ",
    color: theme.primaryWhite
  })
});
export default withStyles(styles, { injectTheme: true })(ContextDisplay);
