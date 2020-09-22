import React, { useState } from "react";
import { Button } from "@material-ui/core";
import "../Styles/Upload.css";
import { storage, db, auth } from "../firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

function Upload() {
  const [description, setDescription] = useState("");
  const [song, setSong] = useState("");
  const [video, setVideo] = useState(null);
  const [progress, setProgress] = useState(0);
  const history = useHistory();

  const handleUploadChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const storageRef = storage.ref(`videos/${video.name}`).put(video);

    storageRef.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.lof(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("videos")
          .child(video.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("videos").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              description: description,
              url: url,
              channel: auth.currentUser.displayName,
              song: song,
              likes: 0,
              shares: 0,
              messages: 0,
            });
            setProgress(0);
            setDescription("");
            setSong("");
            setVideo(null);
            history.push("/");
          });
      }
    );
  };

  return (
    <div className="upload">
      <div className="upload__container">
        <form>
          <h3>Description</h3>
          <input
            className="upload__input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h3>Song</h3>
          <input
            className="upload__input"
            type="text"
            value={song}
            onChange={(e) => setSong(e.target.value)}
          />

          <h3>Video</h3>
          <input
            className="upload__input"
            type="file"
            accept="video/*"
            onChange={handleUploadChange}
          />

          <center>
            <Button
              type="submit"
              className="signup__submitButton"
              disabled={!video}
              onClick={handleUpload}
              variant="contained"
              color="primary"
            >
              Upload
            </Button>
          </center>
          <progress className="video__progress" max="100" value={progress} />
        </form>
      </div>
    </div>
  );
}

export default Upload;
