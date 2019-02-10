import React from "react";
import withStyles from "react-jss";

const ClientCard = props => {
  const { client, classes } = props;
  const { gamePiece } = client;
  return (
    <div className={classes.card}>
      <div className={classes.username}>
        {client.username}
        <div className={classes.wpm}>
          {gamePiece.wpm} <span className={classes.wpmBadge}>WPM</span>
        </div>
      </div>

      <span className={classes.stat}>
        <span className={classes.wpmBadge}>ACCURACY</span>
        {gamePiece.accuracy}
      </span>

      <span className={classes.stat}>
        <span className={classes.wpmBadge}>ERRORS</span>
        {gamePiece.errors}
      </span>

      <span className={classes.stat}>
        <span className={classes.wpmBadge}>TIME</span>
        {gamePiece.time}
      </span>
    </div>
  );
};

const styles = theme => ({
  card: props => ({
    display: "grid",
    gridTemplateRows: "auto min-content",
    gridTemplateColumns: "1fr 1fr 1fr",
    backgroundColor: theme.primaryWhite,
    margin: "0px 0px 0px 0px",
    borderLeft: `2px solid ${theme.divider}`,
    // borderRadius: 8,
    // height: "100px",
    "&:first-child": {
      border: "none"
    },
    // backgroundClip: "padding-box",
    // border: "1px solid rgba(0,0,0,.05)",
    // boxShadow: "0 1px 15px rgba(27,31,35,.15)",
    ...props.style
  }),
  username: props => ({
    display: "flex",
    flexDirection: "row",
    backgroundColor: props.color,//"#555abf",
    boxShadow: "0 1px 5px rgba(50,50,93,.25)",
    fontWeight: 600,
    lineHeight: "25px",
    height: "35px",
    margin: "5px 5px 0px 5px",
    borderRadius: 4,
    color: theme.primaryWhite,
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
  wpmBadge: {
    fontSize: 12
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    verticalAlign: "middle",
    color: "#8E8D8F",
    fontWeight: 600,
    height: "50%",
    margin: "auto"
  }
});

export default withStyles(styles, { injectTheme: true })(ClientCard);
