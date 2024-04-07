import React from "react";
import styles from "./slider.module.css";
import YouTube from "react-youtube";

const Slider = () => {
  const videoId = "XHTrLYShBRQ";

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className={styles.sliderWraper}>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default Slider;
