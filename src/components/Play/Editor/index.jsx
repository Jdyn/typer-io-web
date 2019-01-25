import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"
import withStyles from "react-jss";
import InputPrompt from "./InputPrompt";
import InputRecord from "./InputRecord";

const propTypes = {
  classes: PropTypes.object.isRequired,
  gameboard: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  gameboardUpdate: PropTypes.func.isRequired
}

const Editor = props => {
  const { classes, gameboard, client, gameboardUpdate } = props;
  const [state, setState] = useState({
    gamePieceIndex: null,
    isWrong: false,
    words: [],
    wordsRemaining: [],
    wordsComplete: [],
  })

  useEffect(() => {
    setState({ ...state, words: gameboard.words, wordsRemaining: gameboard.words })
  }, [gameboard.words])

  useEffect(() => {
    if (state.gamePieceIndex !== null) {
      gameboardUpdate(state.gamePieceIndex)
    }
  }, [state.gamePieceIndex])

  const updateState = payload => {
    setState({ ...state, ...payload })
  }

  const focusInput = () => {
    document.getElementById("inputDiv").focus();
  };
  return (
    <div className={classes.container}>
      {client.id &&
        <div className={classes.wrapper} onClick={focusInput}>
          <InputRecord
            words={state.words}
            isWrong={state.isWrong}
            wordsComplete={state.wordsComplete}
            wordsRemaining={state.wordsRemaining}
            gameboard={gameboard}
            editorUpdate={updateState}
          />
        </div>
      }
      {client.id &&
        <div className={classes.wrapper} onClick={focusInput}>
          <InputPrompt
            gameboard={gameboard}
            wordsRemaining={state.wordsRemaining}
          />
        </div>
      }
    </div>
  );
}

Editor.propTypes = propTypes

const styles = theme => ({
  container: {
    margin: "15px 15px 15px 15px",
    display: "flex",
    position: "relative",
    overflow: " hidden",
    maxWidth: "650px",
    minWidth: "450px",
    height: "100px",
    gridColumn: "2 / 3",
    flexDirection: "row",
    backgroundColor: theme.primaryWhite,
    borderRadius: 8,
    transition: "background-color 0.5s",
    boxShadow: "0px -6px 40px 0px rgba(50,50,93,.25) inset"
  },
  wrapper: {
    display: "inline-block",
    width: "50%",
    height: "100%",
    overflow: "hidden"
  }
});

export default withStyles(styles)(Editor);
