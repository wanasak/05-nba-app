import React from "react";
import SideNav from "react-simple-sidenav";
import SidenavItems from "./SidenavItems";

const SideNavigation = props => {
    return (
        <div>
            <SideNav
                showNav={props.showNav}
                onHideNav={props.onHideNav}
                onShowNav={props.onShowNav}
                navStyle={{
                    background: "#242424",
                    maxWidth: "220px"
                }}
            >
                <SidenavItems />
            </SideNav>
        </div>
    );
};

export default SideNavigation;
