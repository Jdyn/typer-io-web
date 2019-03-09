import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Header from "../reusable/Header";
import Button from "../reusable/Button";

const propTypes = {};

const MatchSettings = props => {
  const { classes, theme, history, form, setForm, handleSubmit } = props;

  return (
    <div className={classes.container}>
      <Header
        boxShadow="0 5px 20px rgba(35,35,80,.25)"
        color={theme.primaryWhite}
        borderRadius="8px 8px 0px 0px"
        fontSize={24}
        backgroundColor={"#555abf"}
        padding="10px"
      >
        Settings
      </Header>
      <form className={classes.form} onSubmit={e => handleSubmit(e)}>
        <h3 className={classes.title}>What will you type?</h3>
        <div>
          <input
            type="radio"
            name="randomQuote"
            className={classes.radio}
            checked={form.isRandom}
            onChange={e =>
              setForm({
                ...form,
                isRandom: !form.isRandom,
                isCustom:
                  form.isRandom === form.isCustom
                    ? form.isCustom
                    : !form.isCustom
              })
            }
          />
          <span>Random Quote</span>
        </div>
        <div>
          <input
            type="radio"
            name="customQuote"
            className={classes.radio}
            checked={form.isCustom}
            onChange={e =>
              setForm({
                ...form,
                isRandom:
                  form.isRandom === form.isCustom
                    ? form.isRandom
                    : !form.isRandom,
                isCustom: !form.isCustom
              })
            }
          />
          <span>Custom Quote</span>
        </div>

        {form.isCustom && (
          <textarea
            className={classes.textArea}
            maxLength="600"
            value={form.customQuote}
            cols="25"
            rows="8"
            onChange={e => setForm({ ...form, customQuote: e.target.value })}
          />
        )}

        <div className={classes.buttonGroup}>
          <Button
            onClick={e => history.push("/")}
            backgroundColor={theme.primaryWhite}
            width="115px"
            color="#6772e5"
            margin="15px 15px 0 0"
            activeColor={"#6772e580"}
            boxShadow="0 5px 20px rgba(35,35,80,.25)"
            borderColor={theme.primaryWhite}
          >
            close
          </Button>
          <Button
            onClick={event => handleSubmit(event)}
            type="submit"
            backgroundColor={"#6772e5"}
            width="115px"
            margin="15px 0 0 0"
            color={theme.primaryWhite}
            activeColor={"#fafafa80"}
            boxShadow="0 5px 20px rgba(35,35,80,.25)"
            borderColor={theme.divider}
          >
            start
          </Button>
        </div>
      </form>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "335px",
    maxWidth: "335px",
    transitionDuration: ".2s",
    borderRadius: 8,
    boxShadow:
      "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)",
    backgroundColor: theme.primaryWhite,
    "&:hover": {
      transform: "translateY(-1px)"
    }
  },
  title: {
    margin: 0,
    margin: "10px",
    boxShadow: "inset 0 -1px 0 0 rgba(100,121,143,0.122)"
  },
  textArea: {
    overflow: "auto",
    padding: "10px",
    zIndex: 200,
    border: "none",
    boxShadow: "0px 0px 15px 0px rgba(50,50,93,.25) inset",
    borderRadius: 8,
    margin: "10px",
    fontSize: 18,
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "16px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,0.2)"
    },
    "&::-webkit-scrollbar-button": {
      width: "0",
      height: "0",
      display: "none"
    }
  },
  buttonGroup: {
    margin: "auto 15px 15px auto"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "410px",
    maxHeight: "410px",
    padding: "10px"
  }
});

export default withStyles(styles, { injectTheme: true })(MatchSettings);
