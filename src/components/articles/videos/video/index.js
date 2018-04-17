import React, { Component } from "react";
// import axios from "axios";

// import { URL } from "../../../../config";
import Header from "./Header";
import styles from "../../articles.css";
import VideoRelated from "../../../widgets/videoList/VideoRalated";
import {
  firebaseDB,
  firebaseLooper,
  firebaseTeams,
  firebaseVideos
} from "../../../../firebase";

class VideoArticle extends Component {
  state = {
    video: [],
    team: [],
    teams: [],
    related: []
  };

  componentWillMount() {
    firebaseDB
      .ref(`videos/${this.props.match.params.id}`)
      .once("value")
      .then(snapshot => {
        const video = snapshot.val();

        firebaseTeams
          .orderByChild("teamId")
          .equalTo(video.team)
          .once("value")
          .then(snapshot => {
            const team = snapshot.val();

            this.setState({ video, team });

            this.getRelated();
          });
      });
    // axios
    //     .get(`${URL}/videos?id=${this.props.match.params.id}`)
    //     .then(res => {
    //         let video = res.data[0];
    //         axios.get(`${URL}/teams?id=${video.team}`).then(res => {
    //             this.setState({
    //                 video,
    //                 team: res.data
    //             });
    //             this.getRelated();
    //         });
    //     });
  }
  getRelated = () => {
    firebaseTeams.once("value").then(snapshot => {
      const teams = firebaseLooper(snapshot);

      firebaseVideos
        .orderByChild("team")
        .equalTo(this.state.video.team)
        .limitToFirst(3)
        .once("value")
        .then(snapshot => {
          const related = firebaseLooper(snapshot);
          this.setState({
            related,
            teams
          });
        });
    });

    // axios.get(`${URL}/teams`).then(response => {
    //   let teams = response.data;

    //   axios
    //     .get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
    //     .then(response => {
    //       this.setState({
    //         teams,
    //         related: response.data
    //       });
    //     });
    // });
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
          <VideoRelated data={this.state.related} teams={this.state.teams} />
        </div>
      </div>
    );
  }
}

export default VideoArticle;
