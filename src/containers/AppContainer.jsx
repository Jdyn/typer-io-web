import React, { Component, Fragment } from "react";
import Router from "../components/Router";
import Nav from "../components/Nav/Nav";
import CssBaseline from "../components/CssBaseline";
import { authenticate } from "../actions/ClientActions";
import { connect } from "react-redux";

// import Footer from "../components/Footer/Footer";

class App extends Component {
  componentDidMount() {
    console.log("called")
    const token = localStorage.getItem("token");
    if (token) {
      this.props.authenticate();
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
  state => state,
  mapDispatchToProps
)(App);
