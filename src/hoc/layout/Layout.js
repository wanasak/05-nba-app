import React, { Component } from "react";

import "./layout.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export default class Layout extends Component {
    state = {
        showNav: false
    };

    _toggleSidenav = action => {
        this.setState({ showNav: action });
    };

    render() {
        return (
            <div>
                <Header
                    showNav={this.state.showNav}
                    onHideNav={() => this._toggleSidenav(false)}
                    onOpenNav={() => this._toggleSidenav(true)}
                />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
