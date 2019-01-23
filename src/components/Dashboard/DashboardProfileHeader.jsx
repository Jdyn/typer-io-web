import React from "react";
// import PropTypes from "prop-types";
import withStyles from "react-jss";
import ApiService from "../../services/ApiService";
import Divider from "../Common/Divider";
import Button from "../Common/Button";

class DashboardProfileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.username ? this.props.username : ""
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { updateClient, username } = this.props;
    event.preventDefault();
    const name = this.state.value;
    if (name !== username) {
      if (name !== null) {
        updateClient({ username: name });
      }
    }
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.container}>
        <form onSubmit={this.handleSubmit} className={classes.container}>
          <input
            className={classes.nameInput}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="username"
          />
          <Divider />
          <Button
            type="submit"
            backgroundColor={theme.primaryWhite}
            width="65%"
            margin="5px auto 0px auto"
            color="#6772e5"
            activeColor={"#6772e580"}
          >
            Set
          </Button>
        </form>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "275px",
    width: "275px"
  },
  nameInput: {
    textAlign: "center",
    backgroundColor: theme.primaryWhite,
    maxWidth: "165px",
    margin: "25px auto 0 auto",
    padding: "10px 10px 0px 10px",
    fontSize: 24,
    border: "none",
    outline: "none"
  }
});

export default withStyles(styles, { injectTheme: true })(
  DashboardProfileHeader
);
