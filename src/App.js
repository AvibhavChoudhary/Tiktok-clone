import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Video from "./Component/Video";
import { db, auth } from "./firebase";
import { Button } from "@material-ui/core";
import SignUp from "./Component/SignUp";
import Login from "./Component/Login";
import Upload from "./Component/Upload";

function App() {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
      }
    });
  }, [user]);

  useEffect(() => {
    db.collection("videos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setVideos(
          snapshot.docs.map((doc) => ({ id: doc.id, video: doc.data() }))
        )
      );
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    auth.signOut();
  };

  return (
    <Router>
      <div className="app">
        <div className="app__header">
          <div className="appheader__button">
            <Link className="header__link" to={!user && "/login"}>
              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  color="primary"
                >
                  Logout
                </Button>
              ) : (
                <Button variant="outlined" color="primary">
                  Login
                </Button>
              )}
            </Link>
            <Link className="header__link" to="/">
              <Button variant="outlined" color="secondary">
                Home
              </Button>
            </Link>
            <Link className="header__link" to={user ? "/upload" : "/signup"}>
              <Button variant="outlined" color="primary">
                {user ? "Upload Video" : "Sign Up"}
              </Button>
            </Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/upload">
            <Upload />
          </Route>

          <Route exact path="/">
            <div className="app__main">
              <div className="app__videos">
                {videos.map(({ id, video }) => (
                  <Video
                    key={id}
                    id={id}
                    url={video.url}
                    channel={video.channel}
                    description={video.description}
                    likes={video.likes}
                    shares={video.shares}
                    messages={video.messages}
                    song={video.song}
                  />
                ))}
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
