import React from "react";
import TeamInfo from "../../elements/TeamInfo";

const Header = ({ team }) => {
    const teamInfo = team => {
        return team ? <TeamInfo team={team} /> : null;
    };

    return (
        <div>
            {teamInfo(team)}
        </div>
    );
};

export default Header;
