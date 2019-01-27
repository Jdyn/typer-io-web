import React from "react";
import withStyles from "react-jss";
import Snippet from "./Snippet";
import SnippetWord from "./SnippetWord";
import Header from "../../Common/Header";

const Gameboard = props => {
  const { classes, gameboard, client, room, clientIndex, theme } = props;

  const transform = words => {
    var res = [];
    words.forEach((word, index) =>
      res.push(<SnippetWord key={index} word={word} wordIndex={index} />)
    );
    return res;
  };

  return (
    <div className={classes.container}>
      <Header
        boxShadow="0 5px 20px rgba(35,35,80,.25)"
        // border="1px solid rgba(0,0,0,.1)"
        margin="0px 0px -8px 0px"
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        fontSize={24}
        backgroundColor={"#555abf"} //"#f7bb10"
        padding="10px 10px 15px 10px"
      >
        Map
      </Header>
      <div className={classes.inner}>
        <Snippet
          words={transform(gameboard.words)}
          room={room}
          gamePieceIndex={clientIndex}
          client={client}
        />
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "20px 10px 10px 10px",
    backgroundClip: "padding-box",
    borderRadius: 8,
    //width: ??
    gridRow: "1 / 3",
    gridColumn: "2 / 3"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.primaryWhite,
    position: "relative",
    height: "100%",
    width: "100%",
    // borderRadius: "0px 0px 8px 8px",
    borderRadius: 8,
    zIndex: 100,
    "&:before": {
      content: "''",
      display: "block",
      position: "absolute",
      borderRadius: "0px 0px 8px 8px",
      width: "100%",
      height: "100%",
      zIndex: 5,
      boxShadow: "0px 0px 40px 0px rgba(50,50,93,.25) inset"
    }
  }
});

export default withStyles(styles, { injectTheme: true })(Gameboard);
