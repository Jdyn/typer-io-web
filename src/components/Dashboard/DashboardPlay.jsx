import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const propTypes = {
  username: PropTypes.string.isRequired
};

const DashboardPlay = props => {
  const { username } = props;
  const options = ["Play", "Solo", "Friends"];

  return (
    <div className={classes.container}>

      <Link className={classes.card} to="/">
        <h2 className={classes.text}>Title</h2>
        <p className={classes.text}>
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum."
        </p>
      </Link>
    </div>
    //   <div>
    //   {username !== null
    //     ? options.map(option => (
    //         <Link to="/play" key={option}>
    //           <button>{option}</button>
    //         </Link>
    //       ))
    //     : options.map(option => <button key={option}>{option}</button>)}
    // </div>
  );
};

DashboardPlay.propTypes = propTypes;
export default DashboardPlay;
