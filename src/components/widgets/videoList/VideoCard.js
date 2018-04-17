import React from "react";
import { Link } from "react-router-dom";
import styles from "./videoList.css";
import FontAwesome from "react-fontawesome";
import { Label } from "react-bootstrap";
import moment from "moment";

const formatDate = date => {
    return moment(date).format(" MM-DD-YYYY");
}

const VideoCard = props => {
    const teamName = team => {
        let data = props.teams.find(item => {
            return item.id === team;
        });
        return data ? data.name : "";
    };

    return props.data.map((item, i) => {
        return (
            <Link
                to={`/videos/${item.id}`}
                key={i}
                style={{ textDecoration: "none" }}
            >
                <div className={styles.container}>
                    <div
                        className={styles.leftContent}
                        style={{
                            background: `url(/images/videos/${item.image})`
                        }}
                    >
                        <div />
                    </div>
                    <div className={styles.rightContent}>
                        <div>
                            <span>
                                <Label bsStyle="default">
                                    {teamName(item.team)}
                                </Label>{" "}
                            </span>
                            <span className={styles.cardDate}>
                                <FontAwesome
                                    name="clock-o"
                                    className={styles.cardIcon}
                                />
                                {formatDate(item.date)}
                            </span>
                        </div>
                        <div>
                            <h2>{item.title}</h2>
                        </div>
                    </div>
                </div>
            </Link>
        );
    });
};

export default VideoCard;
