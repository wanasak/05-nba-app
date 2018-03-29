import React from "react";
import { Label } from "react-bootstrap";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";

import styles from "./newsList.css";

const NewsCard = props => {
    const teamName = (team) => {
        let data = props.teams.find(item => {
            return item.id === team;
        });
        return data ? data.name : "";
    }

    return (
        <div className={styles.newsListItem}>
            <div>
                <span>
                    <Label bsStyle="default">{teamName(props.item.team)}</Label>{" "}
                </span>
                <span className={styles.cardDate}>
                    <FontAwesome name="clock-o" className={styles.cardIcon} />
                    {props.item.date}
                </span>
            </div>
            <div>
                <Link to={`/articles/${props.item.id}`}>
                    <h2>{props.item.title}</h2>
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;
