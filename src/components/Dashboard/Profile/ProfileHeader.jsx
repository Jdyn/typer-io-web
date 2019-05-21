import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Button from "../../reusable/Button";

const propTypes = {
  classes: PropTypes.object.isRequired,
  username: PropTypes.string,
  updateClient: PropTypes.func.isRequired
};

const ProfileHeader = props => {
  const { classes, username, updateClient } = props;
  const [name, setName] = useState(username ? username : "");

  const handleSubmit = event => {
    event.preventDefault();
    if (name !== username) {
      updateClient({ username: name });
    }
  };

  useEffect(() => {
    if (name !== username) {
      updateClient({ username: name });
    }
  }, [name]);

  return (
    <div className={classes.container}>
      <div className={classes.portrait} />
      <form onSubmit={handleSubmit} className={classes.container}>
        <input
          className={classes.input}
          type="text"
          maxLength={16}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="username"
        />
        <Button secondary noShadow width="85%" margin="5px auto 0px auto">
          Set
        </Button>
      </form>
    </div>
  );
};

ProfileHeader.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  input: {
    textAlign: "center",
    backgroundColor: theme.primaryWhite,
    width: "85%",
    color: "#8E8D8F",
    margin: "5px auto",
    padding: "0 10px",
    borderBottom: "2px solid #e5e5e5",
    fontSize: 24,
    border: "none",
    outline: "none"
  },
  portrait: {
    position: "relative",
    marginBottom: "10px",
    width: "100px",
    height: "100px",
    alignSelf: "center",
    borderRadius: "50%",
    border: "3px solid #e5e5e5"
  }
});

export default withStyles(styles)(ProfileHeader);
