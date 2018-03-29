import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

import styles from "./videoList.css";
import VideoCard from "./VideoCard";
import { URL } from "../../../config";

class VideoList extends Component {
    state = {
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
        teams: []
    };

    componentWillMount() {
        this.loadVideos(this.state.start, this.state.end);
    }

    loadVideos = (start, end) => {
        if (this.state.teams.length < 1) {
            axios.get(`${URL}/teams`).then(res => {
                this.setState({
                    teams: res.data
                });
            });
        }

        axios.get(`${URL}/videos?_start=${start}&_end=${end}`).then(res => {
            this.setState({
                videos: [...this.state.videos, ...res.data],
                start,
                end
            });
        });
    };

    loadMoreVideos = () => {
        const end = this.state.end + this.state.amount;
        this.loadVideos(this.state.end, end);
    };

    _renderTite = () => {
        return this.props.title ? (
            <h3 className={styles.videoListWrapper}>
                <strong>NBA</strong> Videos
            </h3>
        ) : null;
    };

    _renderButton = () => {
        return (
            <Button
                onClick={this.loadMoreVideos}
                block
                bsStyle="primary"
                style={{ borderRadius: 0 }}
            >
                Load More Videos
            </Button>
        );
    };

    _renderVideos = () => {
        let template = null;

        switch (this.props.type) {
            case "card":
                template = (
                    <VideoCard
                        teams={this.state.teams}
                        data={this.state.videos}
                    />
                );
                break;
            default:
                template = null;
        }

        return template;
    };

    render() {
        return (
            <div>
                {this._renderTite()}
                {this._renderVideos()}
                {this._renderButton()}
            </div>
        );
    }
}

export default VideoList;
