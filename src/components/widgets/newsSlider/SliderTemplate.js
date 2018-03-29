import React from "react";
import Slick from "react-slick";
import { Link } from "react-router-dom";

import styles from "./slider.css";

const SliderTemplate = props => {
    let template = null;
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        ...props.settings
    };

    switch (props.type) {
        case "feature":
            template = props.data.map((item, i) => {
                return (
                    <div key={i}>
                        <div className={styles.featureItem}>
                            <div
                                className={styles.featureImage}
                                style={{
                                    background: `url(../images/articles/${
                                        item.image
                                    })`
                                }}
                            />
                            <Link to={`/articles/${item.id}`}>
                                <div className={styles.featureCaption}>
                                    {item.title}
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            });
            break;
        default:
            template = null;
    }

    return <Slick {...settings}>{template}</Slick>;
};

export default SliderTemplate;
