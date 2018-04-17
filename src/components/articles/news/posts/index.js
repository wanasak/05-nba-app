import React, { Component } from "react";
// import axios from "axios";

// import { URL } from "../../../../config";
import Header from "./Header";
import styles from "../../articles.css";
import {
  firebaseDB,
  firebaseLooper,
  firebaseTeams,
  firebase
} from "../../../../firebase";

class NewsArticle extends Component {
  state = {
    article: [],
    team: [],
    imageUrl: ""
  };

  componentWillMount() {
    firebaseDB
      .ref(`articles/${this.props.match.params.id}`)
      .once("value")
      .then(snapshot => {
        let article = snapshot.val();
        firebaseTeams
          .orderByChild("teamId")
          .equalTo(article.team)
          .once("value")
          .then(snapshot => {
            const team = firebaseLooper(snapshot);
            this.setState({
              article,
              team
            });

            this.getImageURL(article.image);
          });
      });
    // axios
    //     .get(`${URL}/articles?id=${this.props.match.params.id}`)
    //     .then(res => {
    //         let article = res.data[0];
    //         axios.get(`${URL}/teams?id=${article.team}`).then(res => {
    //             this.setState({
    //                 article,
    //                 team: res.data
    //             });
    //         });
    //     });
  }

  getImageURL = filename => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({
          imageUrl: url
        });
      });
  };

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
              background: `url('${this.state.imageUrl}')`
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: article.body
            }}
            className={styles.articleText}
          />
        </div>
      </div>
    );
  }
}

export default NewsArticle;
