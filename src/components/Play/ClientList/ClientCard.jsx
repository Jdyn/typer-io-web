import React from "react";
import withStyles from "react-jss";
import { animated } from "react-spring";

const ClientCard = props => {
  const { client, classes, style } = props;
  const { gamePiece } = client;

  return (
    <animated.div className={classes.container} style={{ width: style.width }}>
      <animated.div
        className={classes.card}
        style={{ transform: style.transform, opacity: style.opacity }}
      >
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
    </animated.div>
  );
};

const styles = theme => ({
  container: {
    position: "relative",
    marign: 0,
    maxWidth: "265px",
    backgroundColor: theme.primary,
    borderRight: "2px solid #e5e5e5",
    "&:before": {
      content: "''",
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%",
      zIndex: -1,
      height: "100%",
      boxShadow: "0px 0px 50px 0px rgba(30,30,70,.3)",
      borderRadius: 16
    },
    "&:first-child": {
      borderRadius: "16px 0 0 16px"
    },
    "&:last-child": {
      borderRadius: "0 16px 16px 0"
    },
    "&:only-child": {
      borderRadius: 16
    }
  },
  card: {
    display: "grid",
    position: "relative",
    gridTemplateRows: "auto min-content",
    gridTemplateColumns: "1fr 1fr 1fr",
    margin: 0,
    zIndex: 50,
    height: "100%",
    overflow: "hidden",
    maxWidth: "265px",
  },
  username: props => ({
    display: "flex",
    flexDirection: "row",
    backgroundColor: props.color,
    boxShadow: "0 1px 5px rgba(30,30,70,.3)",
    fontWeight: 700,
    fontSize: 20,
    alignItems: "center",
    height: "40px",
    overflow: "hidden",
    margin: "8px 5px",
    borderRadius: 12,
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
    fontWeight: 700
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    verticalAlign: "middle",
    color: theme.secondaryColor,
    fontWeight: 600,
    fontSize: 18,
    padding: "2px",
    height: "50%",
    margin: "auto"
  }
});

export default withStyles(styles, { injectTheme: true })(ClientCard);
