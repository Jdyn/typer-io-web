import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired
};

const defaultProps = {
  children: null
};

class CssBaseline extends React.Component {
  render() {
    return this.props.children;
  }
}

const styles = theme => ({
  "@global": {
    html: {
      WebkitFontSmoothing: "antialiased", // Antialiasing.
      MozOsxFontSmoothing: "grayscale", // Antialiasing.
      // Change from `box-sizing: content-box` so that `width`
      // is not affected by `padding` or `border`.
      boxSizing: "border-box",
    },
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    body: {
      margin: 0, // Remove the margin in all browsers.
      backgroundColor: theme.primaryWhite,
      fontSize: '100%',
      fontFamily: ['Camphor', 'Open Sans', 'Segoe UI', 'sans-serif'],
      fontWeight: 400,
      fontStyle: 'normal',
      webkitTextSizeAdjust: '100%',
      textRendering: 'optimizeLegibility',
      fontFeatureSettings: 'pnum',
    }
  }
});

CssBaseline.propTypes = propTypes;
CssBaseline.defaultProps = defaultProps;

export default injectSheet(styles)(CssBaseline);

// Inspired by Material-UI baseline CSS. - Thanks
