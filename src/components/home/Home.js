import React from "react";
import Slider from "../widgets/newsSlider/Slider";
import NewsList from "../widgets/newsList/NewsList";
import VideoList from "../widgets/videoList/VideoList";

const Home = () => {
    return (
        <div>
            <Slider
                type="feature"
                start={0}
                amount={3}
                settings={{ dots: false }}
            />
            <NewsList 
                type="card"
                loadmore={true}
                start={3}
                amount={3}
            />
            <VideoList 
                type="card"
                loadmore={false}
                title={true}
                start={0}
                amount={3}
            />
        </div>
    );
};

export default Home;
