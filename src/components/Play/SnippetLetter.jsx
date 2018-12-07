import React from "react";
import injectSheet from 'react-jss'

const SnippetLetter = props => {
  const { classes, letter } = props;
  return <div className={classes.letter} />;
};

const styles = theme => ({
  letter: {
    display: 'flex',
    width: '24px',
    height: '24px',
    position: 'relative',
    backgroundColor: theme.primaryGrey,
  }
})

export default injectSheet(styles)(SnippetLetter);
