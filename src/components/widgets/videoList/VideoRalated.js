import React from "react";
import styles from "./videoList.css";
import VideoCard from "./VideoCard";

const VideoRelated = ({ data, teams }) => (
    <div className={styles.relatedContainer}>
        <VideoCard data={data} teams={teams} />
    </div>
);

export default VideoRelated;
