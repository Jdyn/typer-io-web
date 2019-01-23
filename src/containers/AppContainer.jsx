import React, { Component, Fragment } from "react";
import Router from "../components/Router";
import Nav from "../components/Nav/Nav";
import CssBaseline from "../components/CssBaseline";
import { authenticate } from "../actions/ClientActions";
import { connect } from "react-redux";

// import Footer from "../components/Footer/Footer";

class App extends Component {
  componentWillMount() {
    const { authenticate } = this.props;
    const token = localStorage.getItem("token");
    if (token) {
      authenticate();
    }
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Nav />
        <Router />
        {/* <Footer /> */}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authenticate: () => dispatch(authenticate())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
