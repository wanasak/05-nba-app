import React from "react";
import VideoList from "../../../widgets/videoList/VideoList";

const VideosMain = () => (
    <VideoList 
        type="card"
        title={false}
        start={0}
        amount={10}
    />
);

export default VideosMain;
