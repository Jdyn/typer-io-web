import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const propTypes = {
  initClient: PropTypes.func.isRequired,
  username: PropTypes.string
};

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
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <form onSubmit={this.handleSubmit} className={classes.container}>
          <input
            className={classes.nameInput}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Nickname"
          />
        </form>
        <div className={classes.divider} />
      </div>
    );
  }
}

DashboardProfileHeader.propTypes = propTypes;

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "275px",
    width: "275px",
    marginBottom: "auto"
  },
  divider: {
    display: "flex",
    position: "relative",
    height: "1px",
    margin: "auto",
    border: "none",
    flexShrink: 0,
    width: "65%",
    backgroundColor: theme.divider
  },
  nameInput: {
    textAlign: "center",
    backgroundColor: theme.primaryWhite,
    maxWidth: "165px",
    margin: "25px auto 0 auto",
    // height: "60px",
    padding: "10px 10px 0px 10px",
    fontSize: 24,
    border: "none",
    outline: "none",

    "&::placeholder": {
      color: theme.primaryGrey
    },

    "&:focus": {
      backgroundColor: theme.primaryWhite
    }
  }
});

export default injectSheet(styles)(DashboardProfileHeader);
