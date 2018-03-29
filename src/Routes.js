import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/layout/Layout";
import Home from "./components/home/Home";
import NewsArticle from "./components/articles/news/posts";
import VideoArticle from "./components/articles/videos/video";
import NewsMain from "./components/articles/news/main";
import VideosMain from "./components/articles/videos/main";

export default class Routes extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/news" exact component={NewsMain} />
                    <Route path="/videos" exact component={VideosMain} />
                    <Route path="/articles/:id" exact component={NewsArticle} />
                    <Route path="/videos/:id" exact component={VideoArticle} />
                </Switch>
            </Layout>
        );
    }
}
