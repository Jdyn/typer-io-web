import React from "react";
import injectSheet from "react-jss";

const PlayChatForm = ({ classes, submitMessage }) => {
  var input = "";

  const onChange = event => {
    input = event.target.value;
  };

  return (
    <form id="chatForm" className={classes.container} onSubmit={e => submitMessage(e, input)}>
      <input
        className={classes.input}
        type="text"
        onChange={onChange}
        placeholder="Write a message..."
        required
      />
    </form>
  );
};

const styles = {
  container: {
    position: "relative",
    height: '45px',
    display: 'flex',
    zIndex: 10,
    margin: "0px 10px 15px 10px",
  },
  input: {
    position: "relative",
    height: "100%",
    width: '100%',
    lineHeight: '20px',
    border: "none",
    outline: "none",
    fontSize: '18px',
    boxShadow: "0px 0px 10px 0px rgba(50,50,93,.25)",
    padding: '10px', 
    borderRadius: '12px'
  }
};

export default injectSheet(styles)(PlayChatForm);
