import React, { useRef, useState } from "react";
import "../Styles/Video.css";
import VideoFooter from "./VideoFooter";
import VideoSideBar from "./VideoSideBar";

function Video({
  channel,
  song,
  id,
  url,
  likes,
  description,
  shares,
  messages,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const onVideoPress = () => {
    if (!playing) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleScroll = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="video">
      <video
        loop={false}
        onTouchMove={handleScroll}
        ref={videoRef}
        onClick={onVideoPress}
        className="video__player"
        src={url}
      />

      <VideoFooter channel={channel} description={description} song={song} />

      <VideoSideBar
        id={id}
        url={url}
        channel={channel}
        likes={likes}
        shares={shares}
        messages={messages}
      />
    </div>
  );
}

export default Video;
