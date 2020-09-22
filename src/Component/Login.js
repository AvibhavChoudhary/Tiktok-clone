import React, { useState, useEffect } from "react";
import "../Styles/Login.css";
import { Button } from "@material-ui/core";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <form>
          <h3>Email</h3>
          <input
            className="login__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3>Password</h3>
          <input
            className="login__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="loginButton__container">
            <Button
              type="submit"
              className="login__submitButton"
              onClick={handleLogin}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
