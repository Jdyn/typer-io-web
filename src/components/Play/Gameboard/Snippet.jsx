import React from "react";
import injectSheet from "react-jss";
import GamePiece from "./GamePiece";
import { Transition } from 'react-spring'

const Snippet = props => {
  const { classes, snippet, client } = props;

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        {
          snippet.map(SnippetWord => {

            return (
              <div className={classes.wrapper}>
                {client.room.clients.map((client, index) => {
                  if (SnippetWord.props.wordIndex === client.gamePiece.currentIndex) {
                    return <GamePiece key={index}></GamePiece>
                  }
                })}
                {SnippetWord}
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

Snippet.propTypes = {};

const styles = theme => ({
  container: {
    display: "inline-block",
    position: "relative",
    backgroundColor: theme.primaryWhite,
    paddingLeft: "25px",
    height: "100%",
    width: "100%",
    borderRadius: 8,
    boxShadow: "0px 6px 40px 0px rgba(50,50,93,.25) inset",
    overflow: "hidden"
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
    boxSizing: "content-box",
    width: "100%",
    height: "95%",
    overflow: "auto",
    alignContent: "flex-start",
    padding: "11px 25px 11px 0px"
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    position: "relative"
  }
});

export default injectSheet(styles)(Snippet);
