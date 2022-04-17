import React, { useContext } from "react";
import HackIdeasContext from "../../context";
import { useSessionStorage } from "../../hooks";

import "./nav-bar.less";

const NavBar = () => {
  const { logout } = useContext(HackIdeasContext);
  const [userInSession, setUserInSession] = useSessionStorage("employee", {});

  const handleLogout = () => {
    logout();
    setUserInSession(null);
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <a className="brand-logo">{`{ Hack Ideas }`}</a>
        <ul className="right hide-on-med-and-down">
          <li>
            <a className="logout-btn" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
