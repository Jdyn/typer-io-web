import React from "react";
import injectSheet from "react-jss";
import CommonTitle from "../../CommonComponents/commonTitle";

const ClientListCard = props => {
  const { client, classes } = props;

  return (
    <div className={classes.container}>
      <CommonTitle color="#525f7f" fontSize="24px">
        {client.username}
      </CommonTitle>
      {/* <div className={classes.wpmText}>wpm</div> */}
      <div className={classes.wpmNumber}>{client.gamePiece.wpm}</div>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "15px",
    minWidth: "245px",
    margin: "10px",
    borderRadius: 8
  },
  wpmNumber: {
    display: "flex",
    flexDirection: "row",
    fontSize: "24px",
    margin: "0px 0px 0px auto"
  },
  wpmText: {
    margin: "0px 0px 0px auto",
    verticalAlign: "text-bottom"
  }
});

export default injectSheet(styles)(ClientListCard);
