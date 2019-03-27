import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Header from "../../reusable/Header";
import ProfileHeader from "./ProfileHeader";
import Input from "../../reusable/Input";
import ExitButton from "../../reusable/ExitButton";

const propTypes = {
  classes: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  updateClient: PropTypes.func.isRequired
};

const view = {
  USER: "USER",
  GUEST: "GUEST",
  SIGNUP: "SIGN UP",
  LOGIN: "LOG IN"
};

const templates = {
  signup: {
    type: "SIGN UP",
    fields: ["email", "username", "password"]
  },
  login: {
    type: "LOG IN",
    fields: ["username", "password"]
  }
};

const DashboardProfile = props => {
  const { classes, session, client, updateClient, handleAuth } = props;
  const [state, setState] = useState(session.isLoggedIn ? view.USER : view.GUEST);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!session.isAuthenticating) {
      setState(session.isLoggedIn ? view.USER : view.GUEST);
    }
  }, [session.isLoggedIn]);

  const submitForm = (event, type) => {
    event.preventDefault();
    if (!session.isAuthenticating) {
      // handleAuth(form, type);
    }
  };

  const validate = (form, type) => {};

  const changeView = state => {
    const { isLoggedIn } = session;
    switch (state) {
      case "BACK":
        setForm({});
        setErrors({});
        return setState(isLoggedIn ? view.USER : view.GUEST);
      case "LOG_OUT":
        handleAuth(form, "LOG OUT");
        return setState(view.GUEST);
      default:
        return setState(state);
    }
  };

  const renderView = state => {
    const data = state === templates.login.type ? templates.login : templates.signup;
    switch (state) {
      case view.USER:
        return (
          <div className={classes.wrapper}>
            <ProfileHeader updateClient={updateClient} username={client.username} />
            <button className={classes.whiteButton} onClick={() => changeView("LOG_OUT")}>
              log out
            </button>
          </div>
        );
      case view.GUEST:
        return (
          <div className={classes.wrapper}>
            <ProfileHeader updateClient={updateClient} username={client.username} />
            <button className={classes.blueButton} onClick={() => changeView(view.SIGNUP)}>
              sign up
            </button>
            <button className={classes.whiteButton} onClick={() => changeView(view.LOGIN)}>
              log in
            </button>
          </div>
        );
      case view.SIGNUP:
      case view.LOGIN:
        const type = data.type === view.LOGIN ? view.LOGIN : view.SIGNUP;
        return (
          <div className={classes.wrapper}>
            <ExitButton onClick={() => changeView("BACK")} />
            <form className={classes.form} onSubmit={e => submitForm(e, type)}>
              {data.fields.map(field => (
                <Input
                  key={field}
                  type={field}
                  placeholder={field}
                  width="100%"
                  value={form[field] || ""}
                  onChange={event => setForm({ ...form, [field]: event.target.value })}
                />
              ))}
              <button type="submit" className={classes.blueButton}>
                {data.type}
              </button>
            </form>
          </div>
        );
      default:
        setState(view.GUEST);
        return <div />;
    }
  };

  return (
    <div className={classes.container}>
      <Header>Profile</Header>
      {renderView(state)}
    </div>
  );
};

DashboardProfile.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gridArea: "profile",
    position: "relative",
    margin: 0,
    zIndex: 10,
    borderRadius: "0px 0px 8px 8px",
    boxShadow: "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 60px -30px rgba(0,0,0,.3)"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flexGrow: 1,
    borderRadius: "0px 0px 8px 8px",
    backgroundColor: theme.primaryWhite
  },
  button: {
    cursor: "pointer",
    outline: "none",
    fontWeight: 600,
    borderRadius: 4,
    letterSpacing: ".025em",
    textTransform: "uppercase",
    transitionDuration: ".15s",
    margin: "5px auto 0 auto",
    width: "65%",
    fontSize: 15,
    padding: "10px",
    border: "2px solid",
    borderColor: theme.divider,
    "&:hover": {
      transform: "translateY(-2px)"
    },
    "&:active": {
      transform: "translateY(2px)"
    }
  },
  blueButton: {
    extend: "button",
    backgroundColor: "#6772e5",
    color: theme.primaryWhite
  },
  whiteButton: {
    extend: "button",
    backgroundColor: theme.primaryWhite,
    color: "#6772e5"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "75%",
    margin: "15px auto 0px auto",
    justifyContent: "center"
  }
});

export default withStyles(styles)(DashboardProfile);
