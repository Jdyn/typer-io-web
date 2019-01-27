import React from "react";
import withStyles from "react-jss";
import Divider from "../../Common/Divider";
import Header from "../../Common/Header";

const ClientCard = props => {
  const { client, classes, theme } = props;

  return (
    <div className={classes.card}>
      <Header
        color={theme.fontColor}
        // backgroundColor={props.color}
        fontSize={20}
        borderRadius={"8px 8px 0px 0px"}
        fontWeight={500}
        // boxShadow="0 5px 20px rgba(35,35,80,.25)"
        padding="5px 0px 5px 10px"
        className={classes.username}
      >
        {client.username}
      </Header>
    </div>
  );
};

const styles = theme => ({
  card: props => ({
    backgroundColor: theme.primaryWhite,
    height: "65px",
    borderRadius: 8,
    ...props.style
  })
});

export default withStyles(styles, { injectTheme: true })(ClientCard);
