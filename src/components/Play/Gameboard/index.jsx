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
        // boxShadow="0 5px 20px rgba(35,35,80,.25)"
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        fontSize={24}
        backgroundColor={"#555abf"} //"#f7bb10"
        padding="10px"
      >
        Gameboard
      </Header>
      {/* <div className={classes.wrapper}> */}
        <Snippet
          words={transform(gameboard.words)}
          room={room}
          gamePieceIndex={clientIndex}
          client={client}
        />
      {/* </div> */}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "auto",
    margin: "10px 15px 10px 15px",
    gridRow: "2 / 3",
    gridColumn: "2 / 3",
  },
  wrapper: {
    maxHeight: "auto",
    minHeight: "auto",
    width: "100%"
  }
};

export default withStyles(styles, { injectTheme: true })(Gameboard);
