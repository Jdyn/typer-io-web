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
        <div className={classes.portrait} />
        <span className={classes.username}>{client.username}</span>
        <span className={classes.wpm}>{gamePiece.wpm} wpm</span>
      </animated.div>
    </animated.div>
  );
};

const styles = theme => ({
  container: {
    margin: 0,
    maxWidth: "265px",
    height: "115px"
  },
  card: {
    display: "flex",
    backgroundColor: theme.white,
    // width: "calc(100% + 24px)",
    border: "2px solid #e5e5e5",
    position: "relative",
    height: "100%",
    // marginLeft: "-24px",
    padding: "12px 24px 12px 24px",
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 16
  },
  portrait: props => ({
    width: "46px",
    height: "46px",
    margin: "-3px 10px -3px -3px",
    borderRadius: "50%",
    // boxShadow: "0px 0px 5px rgba(30,30,70,.3) inset",
    border: `3px solid ${props.client.gamePiece.color}`
  }),
  username: props => ({
    textOverflow: "ellipsis",
    maxWidth: "100px",
    fontWeight: 700,
    color: props.client.gamePiece.color,
    whiteSpace: "nowrap",
    overflow: "hidden"
  }),
  wpm: {
    fontSize: "15px",
    fontWeight: 700,
    color: theme.secondaryColor,
    letterSpacing: ".8px",
    margin: "0 0 0 auto",
    textTransform: "uppercase"
  }
});

export default withStyles(styles, { injectTheme: true })(ClientCard);
