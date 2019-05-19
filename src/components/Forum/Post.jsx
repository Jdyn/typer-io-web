import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Navigator from "./Navigator";
import Banner from "../reusable/Banner";
import ApiService from "../../services/ApiService";
import formatTime from "../../lib/formatTime";
import Button from "../reusable/Button";
import PostComments from "./PostComments";
import TextBox from "../reusable/TextBox";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const Post = props => {
  const { classes, view, match, history, isLoggedIn } = props;
  const [post, set] = useState(null);
  const [newComment, setNewComment] = useState({
    body: ""
  });

  useEffect(() => {
    fetchPostLocal();
  }, []);

  const fetchPostLocal = () => {
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
  };

  const submitComment = (event, id, form, setForm) => {
    let payload = { ...form };

    if (typeof id === "number") {
      payload["parent_id"] = id;
    }

    ApiService.post(`/forum/post/${match.params.post_id}/comment`, payload).then(response => {
      if (response.ok) {
        fetchPostLocal();
        setNewComment({ body: "" });
        if (typeof setForm === "function") {
          setForm({ body: "" });
        }
      }
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Banner>Forum</Banner>
        <Navigator view={view} history={history} />
        {post && (
          <>
            <div className={classes.header}>
              <h2>{post.title}</h2>
              <span>
                posted by {post.user.username} {formatTime(post.inserted_at)}
              </span>
            </div>
            <p className={classes.body}>{post.body}</p>
            <div className={classes.rating} />
          </>
        )}
        {isLoggedIn ? (
          <div className={classes.createComment}>
            <TextBox
              placeholder="Leave a comment"
              value={newComment.body}
              onChange={e => setNewComment({ body: e.target.value })}
            />
            <div>
              <Button secondary margin="0 10px 0 0" onClick={() => setNewComment({ body: "" })}>
                cancel
              </Button>
              <Button onClick={e => submitComment(e, null, newComment, null)}>post</Button>
            </div>
          </div>
        ) : (
          <div>Log in to comment on this post.</div>
        )}
      </div>
      <div className={classes.comments}>
        <Banner>Comments</Banner>
        <div className={classes.commentsInfo}>
          <h2>{post && post.comment_count} Comment{post && post.comment_count === 1 ? "" : "s"}</h2>
        </div>
        <PostComments
          submitComment={submitComment}
          comments={post ? post.comments : []}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  wrapper: {
    flexGrow: 1,
    padding: "24px",
    borderRadius: 16,
    boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
    backgroundColor: theme.primary,
    minHeight: "400px",
    width: "100%",
    "& div": {
      fontSize: 16
    }
  },
  formatText: {
    overflowWrap: "break-word",
    wordWrap: "break-word",
    wordBreak: "break-word",
  },
  header: {
    padding: "20px 0px 20px 0",
    "& h2": {
      margin: 0,
      fontSize: 24,
      extend: "formatText"
    },
    "& span": {
      color: theme.secondaryColor,
      margin: 0,
      fontSize: 17
    }
  },
  body: {
    margin: 0,
    marginBottom: "30px",
    fontSize: 17,
    lineHeight: "24px",
    extend: "formatText"
  },
  rating: {
    height: "40px"
  },
  comments: {
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
    padding: "24px",
    borderRadius: 16,
    boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
    backgroundColor: theme.primary,
    minHeight: "400px",
    width: "100%"
  },
  commentsInfo: {
    "& h2": {
      margin: "15px 0",
      fontSize: 22
    }
  }
});

Post.propTypes = propTypes;

export default withStyles(styles)(Post);
