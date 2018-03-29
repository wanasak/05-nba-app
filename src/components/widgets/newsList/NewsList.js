import React, { Component } from "react";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import styles from "./newsList.css";
import { URL } from "../../../config";
import NewsCard from "./NewsCard";

class NewsList extends Component {
    state = {
        items: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
        teams: []
    };

    componentWillMount() {
        this._loadNews(this.props.start, this.state.end);
    }

    _loadNews = (start, end) => {
        if (this.state.teams.length < 1) {
            axios.get(`${URL}/teams`).then(res => {
                this.setState({
                    teams: res.data
                });
            });
        }

        axios.get(`${URL}/articles?_start=${start}&_end=${end}`).then(res => {
            this.setState({
                items: [...this.state.items, ...res.data],
                start,
                end
            });
        });
    };

    _loadMoreNews = () => {
        const end = this.state.end + this.state.amount;
        this._loadNews(this.state.end, end);
    };

    renderNews = () => {
        let template = null;
        switch (this.props.type) {
            case "card":
                template = this.state.items.map((item, i) => {
                    return (
                        <CSSTransition
                            classNames={{
                                enter: styles.newsListWrapper,
                                enterActive: styles.newsListWrapperActive
                            }}
                            timeout={500}
                            key={i}
                        >
                            <NewsCard item={item} teams={this.state.teams} />
                        </CSSTransition>
                    );
                });
                break;
            case "cardMain":
                template = this.state.items.map((item, i) => {
                    return (
                        <CSSTransition
                            classNames={{
                                enter: styles.newsListWrapper,
                                enterActive: styles.newsListWrapperActive
                            }}
                            timeout={500}
                            key={i}
                        >
                            <Link
                                to={`/articles/${item.id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <div className={styles.cardMainContainer}>
                                    <div
                                        className={styles.left}
                                        style={{
                                            background: `url('/images/articles/${
                                                item.image
                                            }')`
                                        }}
                                    >
                                        <div />
                                    </div>
                                    <div className={styles.right}>
                                        <NewsCard
                                            item={item}
                                            teams={this.state.teams}
                                        />
                                    </div>
                                </div>
                            </Link>
                        </CSSTransition>
                    );
                });
                break;
            default:
                template = null;
        }

        return template;
    };

    render() {
        return (
            <div>
                <TransitionGroup component="div" className="list">
                    {this.renderNews()}
                </TransitionGroup>
                <Button
                    onClick={() => this._loadMoreNews()}
                    block
                    bsStyle="primary"
                    style={{ borderRadius: 0 }}
                >
                    Load More News
                </Button>
            </div>
        );
    }
}

export default NewsList;
