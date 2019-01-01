import React from "react";
import injectSheet from "react-jss";
import ClientListCard from "./ClientListCard";
// import ListLoadingCard from "./ListLoadingCard";
import ClientListHeader from "./ClientListHeader";

const ClientList = props => {
  const { client, classes } = props;

  const getTime = () => {
    const roomTime = props.client.room.timer;
    if (roomTime) {
      const text = roomTime.substring(roomTime.length - 2, roomTime.length);
      const seconds = parseInt(text);
      return seconds
    }
  };

  const getHeaderInfo = () => {
    const res = {};

    if (getTime() > 10) {
      res.backgroundColor = "#469cd0";
      res.text = "Looking for Players...";
    } else if (getTime() > 5) {
      res.backgroundColor = "#e57373";
      res.text = "Get Ready...";
    } else if (getTime() > 0) {
      res.backgroundColor = "#e5a03e";
      res.text = "Get Set...";
    } else if (getTime() === 0) {
      res.backgroundColor = "#81C784";
      res.text = "GO!";
    } else {
      res.backgroundColor = "#469cd0"
      res.text = "Looking for Players..."
    }

    return res;
  };

  console.log("rerendered")
  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <ClientListHeader client={client} headerInfo={getHeaderInfo()} />
        {client.room &&
          client.room.clients.map((client, index) => (
            <ClientListCard key={index} client={client} />
          ))}
      </div>
      {/* {client.room.clients.length > 0 && client.room.clients.length < 5 && (
        <ListLoadingCard />
      )} */}
    </div>
  );
};

const styles = theme => ({
  inner: {
    display: "flex",
    width: "265px",
    flexDirection: "column",
    position: "relative",
    margin: "0px",
    backgroundColor: theme.primaryWhite,
    maxHeight: "500px",
    boxShadow: "0px 5px 30px 5px rgba(50,50,93,.25)",
    borderRadius: 8
  },
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "25px 15px 15px 15px",
    position: "relative",
    gridRow: "1 / 3",
  },
  listHeader: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "0px",
    fontSize: "18px",
    color: "black",
    padding: "20px",
    fontWeight: 600,
    textAlign: "center"
  }
});

export default injectSheet(styles)(ClientList);
