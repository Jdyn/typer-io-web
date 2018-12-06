import React from "react";
// import PropTypes from "prop-types";
import CommonPaper from "../CommonComponents/CommonPaper";
import injectSheet from "react-jss";
import PlayMainSnippet from "./PlayMainSnippet";

const PlayMain = props => {
  const { classes } = props;

  const snippet = "This sentence's contains strings.";

  const transformSnippet = snippet => {
    var words = snippet.split(" ")

    words.forEach((word, index) => {
      if (word.includes("'") || word.includes(".")) {
        const letters = word.split('')
        letters.forEach((letter, index) => {
          if (letter === "." || letter === "'") {
            console.log(index, word)
          }
        })
      }
    })

    // for (const [i, value] of words.entries()) {
    //   console.log(i, value)
    // }
  };

  transformSnippet(snippet);

  const set = new Set([
    <CommonPaper key="1">Hello</CommonPaper>,
    <CommonPaper key="2">World</CommonPaper>,
    <CommonPaper key="3">...</CommonPaper>
  ]);

  return [...set].map(element => element);
};

PlayMain.propTypes = {};

const styles = theme => ({
  container: {
    display: "flex",
    backgroundColor: theme.primaryWhite,
    margin: "25px 15px 0px auto"
  }
});

export default injectSheet(styles)(PlayMain);
