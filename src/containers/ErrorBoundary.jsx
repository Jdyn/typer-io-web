import React from "react";
import * as Sentry from "@sentry/browser";
import withStyles from "react-jss";
import CssBaseline from "../components/Baseline";
// import Header from "../components/Header/index";
import Button from "../components/reusable/Button";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(err, info) {
    this.setState({ hasError: true });
    Sentry.captureException(err);
  }

  render() {
    const { classes, theme } = this.props;
    if (this.state.hasError) {
      return (
        <>
          {/* <Header /> */}
          <div className={classes.stripe} />

          <div className={classes.root}>
            <CssBaseline />
            <h1>An error? But how...</h1>
            <h3>Let us know.</h3>
            <Button
              boxShadow="0 5px 20px rgba(35,35,80,.25)"
              backgroundColor="#555abf"
              margin="0 auto 0 60px"
              color="#fff"
              borderColor={theme.divider}
              onClick={() =>
                (window.location.href = "http://typer-io-web.s3-website-us-west-1.amazonaws.com/")
              }
            >
              Back Home
            </Button>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

const styles = theme => ({
  root: {
    maxWidth: "1185px",
    "& h1": {
      padding: "40px 20px 5px 60px"
    },
    "& h3": {
      padding: "5px 20px 20px 60px"
    }
  },
  link: {
    textDecoration: "none",
    color: theme.primaryWhite,
    letterSpacing: ".025em",
    width: "100%",
    height: "100%"
  },
  stripe: {
    zIndex: -1,
    width: "100%",
    height: "85%",
    overflow: "hidden",
    WebkitTransform: "skwY(-12deg)",
    transform: "skewY(-12deg)",
    WebkitTransformOrigin: 0,
    transformOrigin: 0,
    backgroundColor: theme.tertiaryWhite,
    position: "absolute"
  }
});

export default withStyles(styles, { injectTheme: true })(ErrorBoundary);
