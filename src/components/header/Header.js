import React from "react";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";

import style from "./header.css";
import SideNavigation from "./sidenav/Sidenav";

const Header = (props) => {
    const logo = () => {
        return (
            <Link to="/" className={style.logo}>
                <img alt="nba-logo" src="/images/nba_logo.png" />
            </Link>
        );
    };

    const navBars = () => {
        return (
            <div>
                <FontAwesome
                    onClick={props.onOpenNav}
                    name="bars"
                    style={{
                        color: "#dfdfdf",
                        padding: "10px",
                        cursor: "pointer"
                    }}
                />
            </div>
        );
    };

    return (
        <header className={style.header}>
            <SideNavigation {...props}/>
            <div className={style.headerText}>
                {navBars()}
                {logo()}
            </div>
        </header>
    );
};

export default Header;
