
import { useSidebar } from "../context/SidebarContext";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPeopleRoof,
  faUser,
  faSignOutAlt,
  faThLarge,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useSidebar();


    // In, small screen, minimize sidebar
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 901) {
                setShowSidebar(false);
            }
        };

        handleResize();

    handleResize();

    window.addEventListener("resize", handleResize); // handleResize function will be called whenever the user resizes the browser window.

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { logout } = useAuth();
  const toggleNavbar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  return (
    <div className={`l-sidebar ${showSidebar ? "show" : ""}`}>
      <nav className="sidebar_nav">
        <div>
          <div className="nav_logo">
            <FontAwesomeIcon
              icon={faPeopleRoof}
              className={`nav_icon nav_logo-icon ${showSidebar ? "" : "hidden"}`}
            />
            <span className={`nav_logo-name ${showSidebar ? "" : "hidden"}`}>
              Admin
            </span>
            <button className="sidebar__toggle" onClick={toggleNavbar}>
              <FontAwesomeIcon
                icon={showSidebar ? faArrowLeft : faArrowRight}
                className={`nav_icon ${showSidebar ? "faArrowLeft" : "faArrowRight"}`}
              />
            </button>
          </div>
          <div className="nav_list">
            <NavLink to="/admin/dashboard" className="nav_link">
              <FontAwesomeIcon icon={faThLarge} className="nav_icon" />
              <span className="nav_name">Dashboard</span>
            </NavLink>

            <NavLink to="/admin/manage" className="nav_link">
              <FontAwesomeIcon icon={faUser} className="nav_icon" />
              <span className="nav_name">Management</span>
            </NavLink>
          </div>
        </div>
        <a href="#" className="nav_link" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="nav_icon" />
          <span className="nav_name">Sign Out</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
