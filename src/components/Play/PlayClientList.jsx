import React from "react";
import injectSheet from "react-jss";
import ClientListCard from "./ClientListCard";
import CommonTitle from "../CommonComponents/commonTitle";
import CommonPaper from "../CommonComponents/CommonPaper";

const PlayClientList = props => {
  const { client, classes } = props;
  return (
    <div className={classes.container}>
      <CommonPaper>
        <CommonTitle className={classes.title} color="black" padding="10px">
          Current Players:
        </CommonTitle>
        {client.room &&
          client.room.clients.map(client => <ClientListCard client={client} />)}
      </CommonPaper>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    position: "relative",
    backgroundColor: theme.primaryWhite,
    margin: "25px auto 0px auto"
  }
});

export default injectSheet(styles)(PlayClientList);
