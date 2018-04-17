import React from "react";
import { Switch } from "react-router-dom";

import Layout from "./hoc/layout/Layout";
import Home from "./components/home/Home";
import NewsArticle from "./components/articles/news/posts";
import VideoArticle from "./components/articles/videos/video";
import NewsMain from "./components/articles/news/main";
import VideosMain from "./components/articles/videos/main";
import SignIn from "./components/signin/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/AuthRoutes/PrivateRoutes";
import PublicRoute from "./components/AuthRoutes/PublicRoutes";

const Routes = props => {
  return (
    <Layout user={props.user}>
      <Switch>
        <PublicRoute
          {...props}
          restricted={false}
          path="/"
          exact
          component={Home}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/news"
          exact
          component={NewsMain}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/videos"
          exact
          component={VideosMain}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/articles/:id"
          exact
          component={NewsArticle}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/videos/:id"
          exact
          component={VideoArticle}
        />
        <PublicRoute
          {...props}
          restricted={true}
          path="/sign-in"
          exact
          component={SignIn}
        />
        <PrivateRoute
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
