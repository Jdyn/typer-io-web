import React from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";

const propTypes = {
  filters: PropTypes.array.isRequired
};

const Filter = props => (
  <ul className={props.classes.container}>
    {props.filters.map((filter, index) => (
      <li key={index} className={props.classes.item}>
        {filter.name}
      </li>
    ))}
  </ul>
);

Filter.propTypes = propTypes;
Filter.defaultProps = {};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    margin: 0,
    padding: 0,
    borderBottom: "2px solid #e5e5e5"
    // marginTop: "15px",
    // marginLeft: "-24px",
    // width: "calc(100% + 48px)"
  },
  item: props => ({
    display: "flex",
    marginBottom: "-2px",
    justifyContent: "center",
    textTransform: "uppercase",
    letterSpacing: ".8px",
    fontSize: "16px",
    fontWeight: 700,
    position: "relative",
    listStyle: "none",
    cursor: "pointer",
    color: theme.secondaryColor,
    borderBottom: "2px solid #e5e5e5",
    padding: props.padding
  })
});

export default withStyles(styles)(Filter);
