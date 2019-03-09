import React from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import ProfileHeader from "./ProfileHeader";
import Divider from "../../reusable/Divider";
import Button from "../../reusable/Button";

const propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  updateClient: PropTypes.func.isRequired,
  changeProfile: PropTypes.func.isRequired
};

const GuestView = props => {
  const { classes, updateClient, client, changeProfile, theme } = props;
  return (
    <div className={classes.inner}>
      <ProfileHeader updateClient={updateClient} username={client.username} />
      <div className={classes.wrapper}>
        <Divider />
        <Button
          onClick={() => changeProfile("LOGIN_VIEW")}
          backgroundColor={theme.primaryWhite}
          width="65%"
          margin="5px auto 0px auto"
          color="#6772e5"
          activeColor={"#6772e580"}
          borderColor={theme.divider}
        >
          log in
        </Button>
        <Button
          onClick={() => changeProfile("SIGNUP_VIEW")}
          backgroundColor={"#6772e5"}
          width="65%"
          margin="5px auto 0 auto"
          color={theme.primaryWhite}
          activeColor={"#fafafa80"}
          borderColor={theme.divider}
        >
          sign up
        </Button>
      </div>
    </div>
  );
};

GuestView.propTypes = propTypes;

const styles = {
  inner: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "100%"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: "auto 0px 25px 0px",
    // flexBasis: "275px"
  }
};

export default withStyles(styles, { injectTheme: true })(GuestView);
