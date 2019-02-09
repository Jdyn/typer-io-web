import React from "react";
import { Transition } from "react-spring";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ClientCard from "./ClientCard";
import Header from "../../Common/Header";

const propTypes = {
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const ClientList = props => {
  const { room, classes, socket, theme, currentClient } = props;

  return (
    <div className={classes.container}>
      {socket.connected && (
        <div className={classes.listHeader}>
          Players
          <div className={classes.wpm}>You are</div>
          <div className={classes.wpmBadge} />
        </div>
      )}

      {socket.connected && (
        <div className={classes.inner}>
          <Transition
            items={room.clients}
            keys={item => item.id}
            from={{ overflow: "hidden", height: "0px" }}
            enter={{ height: "110px" }}
            leave={{ height: "0px" }}
          >
            {client => props => (
              <ClientCard
                style={props}
                client={client}
                color={client.gamePiece.color}
              />
            )}
          </Transition>
        </div>
      )}
    </div>
  );
};

ClientList.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "Flex",
    flexDirection: "column",
    gridRow: "2 / 5",
    gridColumn: "1 / 2",
    margin: "0px 10px 0px 10px",
    position: "relative"
  },
  inner: {
    borderRadius: "0px 0px 8px 8px",
    backgroundColor: theme.primaryWhite,
    boxShadow: "0px 0px 30px 5px rgba(50,50,93,.25)"
  },
  listHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#555abf",
    boxShadow: "0 5px 20px rgba(35,35,80,.25)",
    // height: "35px",
    borderRadius: "8px 8px 0px 0px",
    fontSize: 24,
    fontWeight: 600,
    color: theme.primaryWhite,
    padding: "10px"
  },
  wpm: {
    display: "flex",
    flexDirection: "row",
    margin: "auto 0px auto auto",
    backgroundColor: "",
    fontSize: 12,
    verticalAlign: "middle",
    color: theme.primaryWhite //"#616161"
  },
  wpmBadge: props => ({
    height: "15px",
    width: "25px",
    margin: "10px 5px 8px 5px",
    backgroundColor: props.currentClient
      ? props.currentClient.gamePiece.color
      : "transparent",
    borderRadius: 2
  })
});

export default withStyles(styles, { injectTheme: true })(ClientList);
