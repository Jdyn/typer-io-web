import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Button from "../../reusable/Button";

const propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  username: PropTypes.string,
  updateClient: PropTypes.func.isRequired
};

const ProfileHeader = props => {
  const { classes, theme, username, updateClient } = props;
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
      <form onSubmit={handleSubmit} className={classes.container}>
        <input
          className={classes.input}
          type="text"
          maxLength={16}
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="username"
        />
        <Button secondary noShadow width="100%" margin="5px auto 0px auto">
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
    width: "100%",
    color: "#8E8D8F",
    margin: "25px auto 0 auto",
    padding: "10px 10px 0px 10px",
    fontSize: 24,
    border: "none",
    outline: "none"
  }
});

export default withStyles(styles, { injectTheme: true })(ProfileHeader);
