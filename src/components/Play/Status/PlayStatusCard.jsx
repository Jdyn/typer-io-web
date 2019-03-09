import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Header from "../../reusable/Header";

const propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  gameTime: PropTypes.string,
  roomTime: PropTypes.string
};

const PlayStatusCard = props => {
  const { classes, theme, header, gameTime, roomTime } = props;

  return (
    <div className={classes.container}>
      <h3
        border="none"
        color={theme.primaryWhite}
        fontWeight={600}
        fontSize={20}
        height="35px"
      >
        {gameTime || roomTime}
      </h3>
      <h3
        border="none"
        color={theme.primaryWhite}
        fontSize={20}
        fontWeight={600}
      >
      {header.text}
      </h3>
    </div>
  );
};

PlayStatusCard.propTypes = propTypes;

const styles = theme => ({
  container: props => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%",
    flexGrow: 1,
    boxShadow: "0px 0px 30px rgba(50,50,93,.25)",
    borderRadius: "8px",
    border: "1px solid rgba(0,0,0,.1)",
    transition: "background-color 0.5s",
    backgroundColor: props.header ? props.header.color : "black",
    padding: "25px 0px 25px 0px",
    textAlign: "center",
    "& h3": {
      margin: 0,
      height: "35px",
      color: theme.primaryWhite,
      fontSize: "1em",
      fontWeight: 600,

    }
  })
});

export default withStyles(styles, { injectTheme: true })(PlayStatusCard);
