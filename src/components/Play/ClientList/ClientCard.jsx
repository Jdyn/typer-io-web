import React from "react";
import withStyles from "react-jss";

const ClientCard = props => {
  const { client, classes } = props;
  const { gamePiece } = client;
  return (
    <div className={classes.card}>
      <div className={classes.username}>
        {client.username}
        <div className={classes.stat}>
          {gamePiece.wpm} <span className={classes.statHeader}>WPM</span>
        </div>
      </div>
      <span>
        {gamePiece.errors}
        {gamePiece.accuracy}
      </span>
    </div>
  );
};

const styles = theme => ({
  card: props => ({
    display: "grid",
    gridTemplateRows: "min-content auto",
    gridTemplateColumns: "min-content 1fr 1fr",
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
  stat: {
    margin: "auto 0px auto auto",
    backgroundColor: "",
    fontSize: 20,
    textAlign: "center",
    color: theme.primaryWhite //"#616161"
  },
  statHeader: {
    fontSize: 10
  },
  errors: {
    width: "35px",
    height: "85%",
    borderRadius: "0px 8px 8px 0px",
    boxShadow: "0 1px 5px rgba(50,50,93,.25)",
    margin: "5px -10px auto 0px",
    backgroundColor: "#ef5350",
    gridRow: "1 / 3",
    gridColumn: "1 / 2"
  }
});

export default withStyles(styles, { injectTheme: true })(ClientCard);
