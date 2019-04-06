import React from "react";
import withStyles from "react-jss";
import { animated } from "react-spring";

const ClientCard = props => {
  const { client, classes, style } = props;
  const { gamePiece } = client;

  return (
    <animated.div style={style} className={classes.card}>
      <div className={classes.username}>
        {client.username}
        <div className={classes.wpm}>
          {gamePiece.wpm} <span className={classes.statHeader}>WPM</span>
        </div>
      </div>
      <span className={classes.stat}>
        <span className={classes.statHeader}>ACCURACY</span>
        {gamePiece.accuracy}
      </span>
      <span className={classes.stat}>
        <span className={classes.statHeader}>ERRORS</span>
        {gamePiece.errors}
      </span>
      <span className={classes.stat}>
        <span className={classes.statHeader}>TIME</span>
        {gamePiece.time}
      </span>
    </animated.div>
  );
};

const styles = theme => ({
  card: {
    display: "grid",
    gridTemplateRows: "auto min-content",
    gridTemplateColumns: "1fr 1fr 1fr",
    margin: "0",
    position: "relative",
    zIndex: 50,
    boxShadow: "0px 1px 10px -1px rgba(50,50,93,.3)",
    overflow: "hidden",
    border: `1px solid rgb(0,0,0,0.15)`,
    backgroundColor: theme.primary,
    "&:first-child": {
      // border: "none",
      borderRadius: "8px 0px 0px 8px"
    },
    "&:last-child": {
      borderRadius: "0px 8px 8px 0px",
    },
    "&:only-child": {
      borderRadius: 8
    },
    maxWidth: "240px",
    width: "25%",
    overflow: "hidden"
  },
  username: props => ({
    display: "flex",
    flexDirection: "row",
    backgroundColor: props.color,
    boxShadow: "0 1px 5px rgba(50,50,93,.25)",
    fontWeight: 600,
    lineHeight: "25px",
    fontSize: 20,
    height: "35px",
    overflow: "hidden",
    margin: "5px 5px 5px 5px",
    borderRadius: 4,
    color: theme.white,
    padding: "5px 10px 5px 10px",
    gridRow: "2 / 3",
    gridColumn: "1 / 4"
  }),
  wpm: {
    margin: "auto 0px auto auto",
    backgroundColor: "",
    fontSize: 20,
    textAlign: "center",
    color: theme.primaryWhite //"#616161"
  },
  statHeader: {
    fontSize: 12,
    letterSpacing: ".8px",
    fontWeight: 500
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    verticalAlign: "middle",
    color: theme.color,
    fontWeight: 600,
    fontSize: 18,
    padding: "2px",
    height: "50%",
    margin: "auto"
  }
});

export default withStyles(styles, { injectTheme: true })(ClientCard);
