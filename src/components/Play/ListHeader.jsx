import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Header from "../Common/Header";

const propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  gameTime: PropTypes.string,
  roomTime: PropTypes.string
};

const ListHeader = props => {
  const { classes, theme, header, gameTime, roomTime } = props;

  return (
    <div className={classes.container}>
      <Header
        color={theme.primaryWhite}
        fontWeight={600}
        fontSize={20}
        height="20px"
      >
        {gameTime || roomTime}
      </Header>
      <Header color={theme.primaryWhite} fontSize={20} fontWeight={600}>
        {header.text}
      </Header>
    </div>
  );
};

ListHeader.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "265px",
    height: "100px",
    boxShadow: "0px 10px 30px rgba(50,50,93,.25)",
    margin: "20px 10px 20px 10px",
    borderRadius: "8px",
    border: "1px solid rgba(0,0,0,.1)",
    transition: "background-color 1s",
    backgroundColor: props => props.header.color || "#469cd0",
    padding: "25px 0px 25px 0px",
    textAlign: "center"
  }
});

export default withStyles(styles, { injectTheme: true })(ListHeader);
