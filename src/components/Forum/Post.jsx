import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Navigator from "./Navigator";
import Banner from "../reusable/Banner";
import ApiService from "../../services/ApiService";
import formatTime from "../../lib/formatTime";
import Button from "../reusable/Button";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Post = props => {
  const { classes, view, match } = props;
  const [post, set] = useState(null);

  useEffect(() => {
    const id = match.params.post_id;
    if (id) {
      ApiService.fetch(`/forum/post/${id}`)
        .then(response => {
          if (response.ok) {
            set(response.result.post);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className={classes.container}>
      <Banner>Forum</Banner>
      <Navigator view={view} />
      <div className={classes.wrapper}>
        {post && (
          <>
            <div className={classes.header}>
              <h2>{post.title}</h2>
              <span className={classes.body}>
                posted by {post.user.username} {formatTime(post.inserted_at)}
              </span>
            </div>
            <p className={classes.body}>{post.body}</p>
            <div className={classes.rating} />
          </>
        )}
      </div>
      <div className={classes.createComment}>
        <textarea placeholder="Leave a comment" className={classes.textBox} />
        <div>
          <Button secondary margin="0 10px 0 0">
            cancel
          </Button>
          <Button>post</Button>
        </div>
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    borderRadius: 16,
    boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
    backgroundColor: theme.primary,
    minHeight: "400px",
    width: "100%"
  },
  wrapper: {
    padding: "0 15px",
    flexBasis: "200px",
    // marginLeft: "45px"
    flexGrow: 1
  },
  header: {
    padding: "20px 0px 20px 0",
    "& h2": {
      margin: 0,
      marginBottom: "10px"
    },
    "& span": {
      color: theme.secondaryColor
    }
  },
  body: {
    margin: 0,
    marginBottom: "30px",
    fontSize: 17,
    lineHeight: "24px"
  },
  rating: {
    height: "40px"
  },
  textBox: {
    resize: "vertical",
    border: "2px solid #e5e5e5",
    outline: "none",
    backgroundColor: theme.secondary,
    margin: "15px 0",
    padding: "15px",
    borderRadius: 8,
    fontSize: 17,
    lineHeight: "24px",
    width: "100%",
    height: "90px"
  }
});

Post.propTypes = propTypes;

export default withStyles(styles)(Post);
