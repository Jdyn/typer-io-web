import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Banner from "../../reusable/Banner";
import Button from "../../reusable/Button";
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
            <Button secondary noShadow width="95%" onClick={() => changeView("LOG_OUT")}>
              log out
            </Button>
          </div>
        );
      case view.GUEST:
        return (
          <div className={classes.wrapper}>
            <ProfileHeader updateClient={updateClient} username={client.username} />
            <Button
              noShadow
              width="95%"
              margin="10px 0 0 0"
              onClick={() => changeView(view.SIGNUP)}
            >
              sign up
            </Button>
            <Button
              noShadow
              secondary
              width="95%"
              margin="10px 0 0 0"
              onClick={() => changeView(view.LOGIN)}
            >
              log in
            </Button>
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
              <Button margin="15px 0 0 0" width="100%">{data.type}</Button>
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
      <Banner>Profile</Banner>
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
    backgroundColor: theme.white,
    borderRadius: "0px 0px 8px 8px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    flexGrow: 1,
    zIndex: 100,
    padding: "30px",
    borderRadius: "0px 0px 8px 8px",
    boxShadow: "0 50px 100px -20px rgba(50,50,93,.25), 0 30px 30px -10px rgba(0,0,0,.3)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    margin: "15px 0",
    justifyContent: "center"
  }
});

export default withStyles(styles)(DashboardProfile);
