import React, { Component } from "react";
// import axios from "axios";
import SliderTemplate from "./SliderTemplate";

import { firebaseArticles, firebaseLooper, firebase } from "../../../firebase";

class Slider extends Component {
  state = {
    news: []
  };

  componentWillMount() {
    firebaseArticles
      .limitToFirst(3)
      .once("value")
      .then(snapshot => {
        const news = firebaseLooper(snapshot);

        // news.forEach((item, i) => {
        //   firebase
        //     .storage()
        //     .ref("images")
        //     .child(item.image)
        //     .getDownloadURL()
        //     .then(url => {
        //       item.image = url;
        //     });
        // });

        const getImageUrlAsync = (item, i, cb) => {
          firebase
            .storage()
            .ref("images")
            .child(item.image)
            .getDownloadURL()
            .then(url => {
              item.image = url;
              cb();
            });
        };

        let requests = news.map((item, i) => {
          return new Promise(resolve => {
            getImageUrlAsync(item, i, resolve);
          });
        });

        Promise.all(requests).then(() => {
          this.setState({ news });
        });
      })
      .catch(err => console.log(err));

    // axios
    //   .get(
    //     `http://localhost:3004/articles?_start=${this.props.start}&_end=${this
    //       .props.start + this.props.amount}`
    //   )
    //   .then(res => {
    //     this.setState({ news: res.data });
    //   });
  }

  render() {
    return (
      <div>
        <SliderTemplate
          data={this.state.news}
          type={this.props.type}
          settings={this.props.settings}
        />
      </div>
    );
  }
}

export default Slider;
