import React from "react";
import injectSheet from "react-jss";
import ClientListCard from "./ClientListCard";
import CommonTitle from "../../CommonComponents/commonTitle";
import CommonPaper from "../../CommonComponents/CommonPaper";

const PlayClientList = props => {
  const { client, classes } = props;
  return (
    <div className={classes.container}>
      <CommonPaper width='265px'>
        <CommonTitle className={classes.title} color="black" padding="20px">
          Current Players:
        </CommonTitle>
        {client.room &&
          client.room.clients.map((client, index) => <ClientListCard key={index} client={client} />)}
      </CommonPaper>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    position: "relative",
    margin: "25px auto auto auto",
    borderRadius: 8
  }
});

export default injectSheet(styles)(PlayClientList);
