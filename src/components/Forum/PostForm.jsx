import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from "react-jss";
import Navigator from "./Navigator";
import Banner from "../reusable/Banner";
import ApiService from "../../services/ApiService";
import TextBox from "../reusable/TextBox";

const propTypes = {
  classes: PropTypes.object.isRequired
};

const PostForm = props => {
  const { classes, view, history, fetchFeed } = props;

  const [form, setForm] = useState({
    title: "",
    body: ""
  });

  const onSubmit = event => {
    event.preventDefault();
    ApiService.post("/forum/post", form).then(response => {
      if (response.ok) {
        fetchFeed("/forum/posts")
        history.push("/forum");
      }
    });
  };

  return (
    <div className={classes.container}>
      <Banner>Forum</Banner>
      <Navigator view={view} onClick={onSubmit} />
      <TextBox
        className={classes.text}
        maxLength="100"
        value={form.title}
        height="75px"
        onChange={e => setForm({ ...form, title: e.target.value })}
        placeholder="The title of your post."
      />
      <TextBox
        className={classes.text}
        value={form.body}
        height="400px"
        onChange={e => setForm({ ...form, body: e.target.value })}
        placeholder="The contents of your post."
      />
    </div>
  );
};

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    borderRadius: 16,
    boxShadow: "0px 10px 15px rgba(30,30,70,.3)",
    backgroundColor: theme.primary,
    flexGrow: 1
  }
});

PostForm.propTypes = propTypes;

export default withStyles(styles)(PostForm);
