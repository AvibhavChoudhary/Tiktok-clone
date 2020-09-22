import React, { useState, useEffect } from "react";
import "../Styles/VideoSideBar.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MessageIcon from "@material-ui/icons/Message";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import { auth, db, storage } from "../firebase";

function VideoSideBar({ likes, shares, messages, id, url, channel }) {
  const [liked, setLiked] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const deleteVideo = () => {
    const storageRef = storage.refFromURL(url);
    storageRef
      .delete()
      .then(() => {
        console.log("Video deleted successfully");
      })
      .catch((error) => console.log(error.message));

    db.collection("videos")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Successfully delete the record from db");
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    if (auth.currentUser) {
      var show = auth.currentUser.displayName === channel;
    }
    setShowDelete(show);
  }, []);

  return (
    <div className="videoSideBar">
      {showDelete && (
        <div className="videoSideBar__deleteButton">
          <DeleteIcon fontSize="large" onClick={deleteVideo} />
        </div>
      )}
      <div className="videoSideBar__button">
        {liked ? (
          <FavoriteIcon fontSize="large" onClick={(e) => setLiked(false)} />
        ) : (
          <FavoriteBorderIcon
            fontSize="large"
            onClick={(e) => setLiked(true)}
          />
        )}
        <p>{liked ? likes + 1 : likes}</p>
      </div>
      <div className="videoSideBar__button">
        <MessageIcon fontSize="large" />
        <p>{messages}</p>
      </div>
      <div className="videoSideBar__button">
        <ShareIcon fontSize="large" />
        <p>{shares}</p>
      </div>
    </div>
  );
}

export default VideoSideBar;
