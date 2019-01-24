import React from "react";
import withStyles from "react-jss";
import Divider from "../../Common/Divider";
import Header from "../../Common/Header";

const ClientCard = props => {
  const { client, classes, theme } = props;

  return (
    <div className={classes.container}>
      {/* <div className={classes.username}>{client.username}</div>
      <div className={classes.divider} />

      <div className={classes.title}>errors</div>
      <div className={classes.title}>accuracy</div>
      <div className={classes.title}>w/pm</div>

      <div className={classes.errors}>{client.gamePiece.errors}</div>
      <div className={classes.accuracy}>{client.gamePiece.accuracy}</div>
      <div className={classes.wpm}>{client.gamePiece.wpm}</div> */}
      <Divider width="85%" />
      <Header
        color={theme.fontColor}
        padding="10px 15px 10px 15px"
        className={classes.username}
      >
        {client.username}
      </Header>
      {/* <div className={classes.band}></div> */}
    </div>
  );
};

const styles = theme => ({
  container: props => ({
    // display: "grid",
    // gridTemplateColumns: "repeat(3, 1fr)",
    // gridTemplateRows: "min-content 2px auto",
    width: "90%",
    borderRadius: 8,
    backgroundColor: theme.primaryWhite,
    ...props.style
  }),
  band: props => ({
    width: "10%",
    height: "100%",
    marginLeft: "100%",
    backgroundColor: props.color
  })
});

export default withStyles(styles, { injectTheme: true })(ClientCard);
