import React from "react";
import injectSheet from "react-jss";
import CommonTitle from "../../CommonComponents/commonTitle";
import CommonText from "../../CommonComponents/commonText";

const ListLoadingCard = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <CommonTitle color="black">Looking for Players...</CommonTitle>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    minWidth: "245px",
    margin: "10px",
    backgroundColor: theme.secondaryWhite,
    borderRadius: 8
  },
  wpm: {}
});

export default injectSheet(styles)(ListLoadingCard);
