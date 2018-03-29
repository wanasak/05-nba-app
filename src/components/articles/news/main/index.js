import React from "react";
import Slider from "../../../widgets/newsSlider/Slider";
import NewsList from "../../../widgets/newsList/NewsList";

const NewsMain = () => (
    <div>
        <Slider
            type="feature"
            settings={{ dots: false }}
            start={0}
            amount={3}
        />
        <NewsList 
            type="cardMain"
            start={3}
            amount={5}
        />
    </div>
);

export default NewsMain;
