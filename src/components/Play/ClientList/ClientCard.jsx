import React from "react";
import withStyles from "react-jss";
import { animated } from "react-spring";

const ClientCard = props => {
  const { client, classes, style } = props;
  const { gamePiece } = client;

  return (
    <animated.div className={classes.card} style={{ height: style.height }}>
      <div className={classes.portrait} />
      <span className={classes.username}>{client.username}</span>
      <span className={classes.wpm}>{gamePiece.wpm} wpm</span>
    </animated.div>
  );
};

const styles = theme => ({
  card: {
    display: "flex",
    width: "calc(100% + 24px)",
    borderBottom: "2px solid #e5e5e5",
    position: "relative",
    marginLeft: "-24px",
    padding: "12px 0px 12px 24px",
    overflow: "hidden",
    alignItems: "center"
  },
  portrait: props => ({
    width: "46px",
    height: "46px",
    margin: "-3px 10px -3px -3px",
    borderRadius: "50%",
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
