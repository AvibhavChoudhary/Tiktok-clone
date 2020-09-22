import React, { useState } from "react";
import "../Styles/SignUp.css";
import { Button } from "@material-ui/core";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  let history = useHistory();

  const handleSignUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    history.push("/");

    db.collection("users").add({
      email: email,
      password: password,
      username: username,
    });
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <form>
          <h3>Username</h3>
          <input
            className="signup__input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h3>Email</h3>
          <input
            className="signup__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3>Password</h3>
          <input
            className="signup__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="signupButton__container">
            <Button
              type="submit"
              className="signup__submitButton"
              onClick={handleSignUp}
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

export default SignUp;
