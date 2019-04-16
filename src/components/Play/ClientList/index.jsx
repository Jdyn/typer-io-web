import React from "react";
import { useTransition, config } from "react-spring";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ClientCard from "./ClientCard";
import Banner from "../../reusable/Banner";

const propTypes = {
  room: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const ClientList = props => {
  const { room, classes, socket } = props;

  const transitions = useTransition(room.clients, client => client.id, {
    from: {
      opacity: 0,
      overflow: "hidden",
      height: "0%"
      // transform: "translate3d(0, -100%, 0)"
    },
    enter: {
      height: "20%"
    },

    // item => async (next, cancel) => {
    //   await next({ width: room.isSolo ? "100%" : "25%" });
    //   await next({ opacity: 1, transform: "translate3d(0, 0%, 0)" });
    // },
    leave: {
      opacity: 0,
      transform: "translate3d(0, -100%, 0)",
      width: "0%"
    },
    config: config.wobbly
  });

  return (
    <div className={classes.container}>
      <Banner>Players</Banner>
      {socket.connected &&
        transitions.map(({ item, props, key }) => (
          <ClientCard
            style={props}
            client={item}
            color={item.gamePiece.color || "grey"}
            key={key}
          />
        ))}
    </div>
  );
};

ClientList.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    position: "relative",
    gridArea: "clientlist",
    backgroundColor: theme.primary,
    boxShadow: "0px 0px 10px 0px rgba(30,30,73,.3)",
    borderRadius: 16
  }
});

export default withStyles(styles)(ClientList);
