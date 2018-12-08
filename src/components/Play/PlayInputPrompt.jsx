import React from "react";
import injectSheet from "react-jss";

const PlayInputPrompt = ({ classes }) => {
  return (
    <div className={classes.prompt}>
    rmjkeraf eraa erkj fgkeajrer fkaerjf af ajw rfkjwe fk
    </div>
  );
};

const styles = {
  prompt: {
    display: 'flex',
    height: '95%',
    width: '1000px',
    alignItems: 'center',
  }
};

export default injectSheet(styles)(PlayInputPrompt);
