import React from "react";
import injectSheet from "react-jss";
import ClientListCard from "./ClientListCard";
import ListLoadingCard from "./ListLoadingCard";
import ClientListHeader from "./ClientListHeader";

const ClientList = props => {
  const { client, classes } = props;

  const getTime = () => {
    const gameTime = props.client.room.gameboard.gameTime;
    const text = gameTime.substring(gameTime.length - 2, gameTime.length);
    console.log(text)
    const seconds = parseInt(text);
    return seconds;
  };

  const getHeaderInfo = () => {
    const res = {
      backgroundColor: null,
      text: ""
    };
    console.log(getTime());
    if (getTime() > 20) {
      res.backgroundColor = "#e57373";
      res.text = "Get Ready...";
    } else if (getTime() > 10) {
      res.backgroundColor = "#ffe7cb";
      res.text = "Get Set...";
    } else if (getTime() === 0) {
      res.backgroundColor = "#81C784";
      res.text = "GO!";
    }

    return res;
  };

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <ClientListHeader client={client} headerInfo={getHeaderInfo()} />
        {client.room &&
          client.room.clients.map((client, index) => (
            <ClientListCard key={index} client={client} />
          ))}
      </div>
      {client.room.clients.length > 0 && client.room.clients.length < 5 && (
        <ListLoadingCard />
      )}
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
    borderRadius: 8,
    maxHeight: "500px",
    boxShadow: "0px 5px 30px 5px rgba(50,50,93,.25)",
    gridRow: "1 / 3",
    borderRadius: 8
  },
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "25px 15px 15px 15px",
    position: "relative"
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
