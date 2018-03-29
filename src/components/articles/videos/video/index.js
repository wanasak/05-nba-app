import React, { Component } from "react";
import axios from "axios";

import { URL } from "../../../../config";
import Header from "./Header";
import styles from "../../articles.css";
import VideoRelated from "../../../widgets/videoList/VideoRalated";

class VideoArticle extends Component {
    state = {
        video: [],
        team: [],
        teams: [],
        related: []
    };

    componentWillMount() {
        axios
            .get(`${URL}/videos?id=${this.props.match.params.id}`)
            .then(res => {
                let video = res.data[0];

                axios.get(`${URL}/teams?id=${video.team}`).then(res => {
                    this.setState({
                        video,
                        team: res.data
                    });
                    this.getRelated();
                });
            });
    }
    getRelated = () => {
        axios.get(`${URL}/teams`).then(response => {
            let teams = response.data;

            axios
                .get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
                .then(response => {
                    this.setState({
                        teams,
                        related: response.data
                    });
                });
        });
    };

    render() {
        const video = this.state.video;
        const team = this.state.team;

        return (
            <div>
                <Header team={team[0]} />
                <div className={styles.videoContainer}>
                    <h1>{video.title}</h1>
                    <iframe
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`https://www.youtube.com/embed/${video.url}`}
                    />
                    <VideoRelated
                        data={this.state.related}
                        teams={this.state.teams}
                    />
                </div>
            </div>
        );
    }
}

export default VideoArticle;
