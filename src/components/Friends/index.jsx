import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import MatchSettings from "./MatchSettings";
import Chat from "../Play/Chat";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Friends = props => {
  const { classes, history, client, room } = props;

  const [form, setForm] = useState({
    isRandom: false,
    isCustom: true,
    allowSpectators: false,
    customQuote: ""
  });

  const handleSubmit = event => {
    event.preventDefault();
    console.log(form);
  };

  return (
    <main>
      <div className={classes.stripe} />
      <div className={classes.root}>
        <div />
        <MatchSettings
          handleSubmit={handleSubmit}
          form={form}
          setForm={setForm}
          history={history}
        />
        <div className={classes.chat}>
          <Chat room={room} client={client} />
        </div>
        <div className={classes.spectate}>
          <h3 className={classes.title}>Allow people to watch?</h3>
          <div className={classes.option}>
            <input
              type="checkbox"
              name="allowSpectators"
              className={classes.checkbox}
              value={form.allowSpectators}
              onClick={e =>
                setForm({
                  ...form,
                  allowSpectators: !form.allowSpectators
                })
              }
            />
            <span>Allow Spectators</span>
          </div>
        </div>
      </div>
    </main>
  );
};

const styles = theme => ({
  root: {
    display: "grid",
    gridTemplateRow: "1fr 1fr",
    gridTemplateColumns: "1fr min-content 265px",
    gridGap: "15px",
    padding: "15px",
    maxWidth: "1185px",
    margin: "0 auto",
    marginTop: "115px"
  },
  chat: {
    display: "flex"
    // gridRow: "1 / 3",
    // gridColumn: "3 / 4"
  },
  option: {
    padding: "10px"
  },
  title: {
    margin: 0,
    margin: "10px",
    boxShadow: "inset 0 -1px 0 0 rgba(100,121,143,0.122)"
  },
  spectate: {
    gridRow: "2 / 3",
    gridColumn: "2 / 3",
    padding: "15px",
    borderRadius: 8,
    zIndex: 100,
    border: "1px solid rgba(0,0,0,.05)",
    // boxShadow: "0px 0px 15px rgba(50,50,93,.25)",
    boxShadow:
      "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)",
    backgroundColor: theme.primaryWhite
  },
  stripe: {
    zIndex: -1,
    width: "100%",
    height: "95%",
    top: -10,
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.tertiaryWhite,
    position: "absolute"
  },
});

Friends.propTypes = propTypes;

export default withStyles(styles, { injectTheme: true })(Friends);
