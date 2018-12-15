import React from "react";
import injectSheet from "react-jss";

const PlayChatForm = ({ classes, submitMessage }) => {
  var input = "";

  const onChange = event => {
    input = event.target.value;
  };

  return (
    <form className={classes.container} onSubmit={(e) => submitMessage(e, input)}>
      <input
        type="text"
        onChange={onChange}
        // value={input}
        placeholder="Write a message..."
        required
      />
    </form>
  );
};

const styles = {
  container: {}
};

export default injectSheet(styles)(PlayChatForm);
