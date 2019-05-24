import React, { useEffect, useState } from "react";
import withStyles from "react-jss";
import PropTypes from "prop-types";
import Banner from "../../reusable/Banner";
import ApiService from "../../../services/ApiService";
import formatTime from "../../../lib/formatTime";
import LeaderboardCard from "./LeaderboardCard";
import Filter from "../../reusable/Filter";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const filters = [
  {
    name: "week",
    selected: true
  },
  {
    name: "month",
    selected: false
  },
  {
    name: "all time",
    selected: false
  }
];

const Leaderboard = props => {
  const { classes, snippet } = props;

  const [state, set] = useState([]);

  const handleFilter = (event, selectedIndex) => {
    console.log(selectedIndex)
  };

  useEffect(() => {
    if (snippet.id) {
      ApiService.fetch(`/snippet/${snippet.id}/matches`).then(response => {
        if (response.ok) {
          const temp = [...response.result.matches];

          for (let match of temp) {
            match.created_at = formatTime(match.created_at);
          }

          set(temp);
        }
      });
    }
  }, [snippet.id]);

  return (
    <div className={classes.container}>
      <Banner>Leaderboard</Banner>
      <Filter
        extended
        padding="0 0 10px 0"
        fontSize={15}
        filters={filters}
        onClick={handleFilter}
      />

      <div className={classes.wrapper}>
        {state.map((card, index) => (
          <LeaderboardCard key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

const styles = theme => ({
  container: props => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    position: "relative",
    gridArea: "leaderboard",
    boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
    borderRadius: 16,
    // height: "430px",
    // maxHeight: "430px",
    padding: "20px",
    backgroundColor: theme.white
  }),
  categories: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    margin: 0,
    padding: 0,
    marginTop: "15px",
    marginLeft: "-24px",
    width: "calc(100% + 48px)"
  },
  wrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flexGrow: 1,
    marginRight: "-24px",
    height: "1px",
    overflow: "auto",
    marginLeft: "-24px",
    width: "calc(100% + 44px)",
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "16px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,0.2)"
    },
    "&::-webkit-scrollbar-button": {
      width: "0",
      height: "0",
      display: "none"
    }
  },
  category: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    textTransform: "uppercase",
    letterSpacing: ".8px",
    fontSize: "15px",
    fontWeight: 700,
    position: "relative",
    listStyle: "none",
    cursor: "pointer",
    paddingBottom: "10px",
    color: theme.secondaryColor,
    borderBottom: "2px solid #e5e5e5",
    "&:first-child": {
      paddingLeft: "10px"
    },
    "&:last-child": {
      paddingRight: "10px"
    },
    "& span": {
      display: "flex",
      justifyContent: "center"
    }
  }
});

Leaderboard.propTypes = propTypes;

export default withStyles(styles)(Leaderboard);
