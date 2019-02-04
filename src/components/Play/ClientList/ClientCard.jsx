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
    gridTemplateRows: "min-content auto",
    gridTemplateColumns: "1fr 1fr 1fr",
    backgroundColor: theme.primaryWhite,
    borderRadius: 8,
    maxWidth: "265px",
    borderTop: `solid 2px ${theme.divider}`,
    "&:first-child": {
      border: "none"
    },
    ...props.style
  }),
  username: props => ({
    display: "flex",
    flexDirection: "row",
    backgroundColor: props.color,
    boxShadow: "0 1px 5px rgba(50,50,93,.25)",
    fontWeight: 600,
    lineHeight: "25px",
    height: "35px",
    margin: "5px 5px 5px 5px",
    borderRadius: 4,
    color: theme.primaryWhite,
    padding: "5px 10px 5px 10px",
    gridRow: "1 / 2",
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
    fontSize: 10
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    verticalAlign: "middle",
    color: "#8E8D8F",
    fontWeight: 600,
    margin: "5px",
  }
});

export default withStyles(styles, { injectTheme: true })(ClientCard);
