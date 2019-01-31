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
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        fontSize={24}
        backgroundColor={"#555abf"}
        padding="10px"
      >
        Gameboard
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
    borderRadius: 8,
    // maxHeight: "375px",
    gridRow: "1 / 3",
    gridColumn: "2 / 3"
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    // border: "1px solid rgba(0,0,0,.1)",
    backgroundColor: theme.primaryWhite,
    zIndex: 50,
    position: "relative",
    height: "100%",
    width: "100%",
    borderRadius: "0px 0px 8px 8px",
    boxShadow: "0px 10px 40px 0px rgba(50,50,93,.25) inset",
  }
});

export default withStyles(styles, { injectTheme: true })(Gameboard);
