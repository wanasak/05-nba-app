import React, { Component } from "react";
import axios from "axios";

import { URL } from "../../../../config";
import Header from "./Header";
import styles from "../../articles.css";

class NewsArticle extends Component {
    state = {
        article: [],
        team: []
    };

    componentWillMount() {
        axios
            .get(`${URL}/articles?id=${this.props.match.params.id}`)
            .then(res => {
                let article = res.data[0];

                axios.get(`${URL}/teams?id=${article.team}`).then(res => {
                    this.setState({
                        article,
                        team: res.data
                    });
                });
            });
    }

    render() {
        const article = this.state.article;
        const team = this.state.team;

        return (
            <div>
                <Header team={team[0]} article={article} />
                <div className={styles.bodyContainer}>
                    <h1>{article.title}</h1>
                    <div
                        className={styles.articlesImage}
                        style={{
                            background: `url('/images/articles/${
                                article.image
                            }')`
                        }}
                    />
                    <div className={styles.articleText}>{article.body}</div>
                </div>
            </div>
        );
    }
}

export default NewsArticle;
