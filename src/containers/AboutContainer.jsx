import React from 'react'
import injectSheet from 'react-jss'
import { useState } from 'react'
const About = props => {
  const { classes } = props
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = event => {
    event.preventDefault()
    console.log("form", form)
    fetch("http://localhost:4000/api/v1/sessions/login", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(json => console.log(JSON.stringify(json)))
  }

  return (
    <div>
      <p> This is the About Page. </p>
      <form onSubmit={handleSubmit} className={classes.container}>
        <input
          className={classes.input}
          type="text"
          value={form.email}
          onChange={event => setForm({ ...form, email: event.target.value })}
          placeholder="email"
        />
        <div className={classes.divider} />
        <input
          className={classes.input}
          type="text"
          value={form.password}
          onChange={event => setForm({ ...form, password: event.target.value })}
          placeholder="password"
        />
        <button type="submit" className={classes.button}>Log in</button>
      </form>
    </div>
  )
}

const styles = {
  container: {
    width: "65%",
    margin: "0px auto 0px auto"
  },
  input: {
    width: "100%",
    height: "64px",
    lineHeight: "64px",
    fontSize: "32px"
  },
  button: {
    height: "64px",
    width: "100%",
    fontSize: "32px"
  }
}

export default injectSheet(styles)(About)