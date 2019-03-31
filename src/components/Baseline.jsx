import PropTypes from "prop-types";
import withStyles from "react-jss";

const propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired
};

const defaultProps = {
  children: null
};

const Baseline = props => props.children

const styles = theme => ({
  "@global": {
    html: {
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      boxSizing: "border-box"
    },
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    "body, button": {
      margin: 0,
      backgroundColor: theme.primary,
      fontSize: "100%",
      // fontDisplay: "auto",
      fontFamily: ["Museo Sans Rounded", "Open Sans", "Segoe UI", "sans-serif"],
      fontWeight: "normal",
      fontStyle: "normal",
      webkitTextSizeAdjust: "100%",
      textRendering: "optimizeLegibility",
    }
  }
});

Baseline.propTypes = propTypes;
Baseline.defaultProps = defaultProps;

export default withStyles(styles)(Baseline);
