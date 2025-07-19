import { Link, NavLink } from "react-router-dom";
import codinghubLogo from "../../assets/codinghub.png";
import { IoIosSearch } from "react-icons/io";
import { useContext } from "react";
import { MyContext } from "../../App";

const Navbar = () => {
  const { currUser } = useContext(MyContext);
  const languages = [
    "html",
    "css",
    "javascript",
    "bootstrap",
    "tailwindcss",
    "react",
    "nodeJs",
    "mongodb",
    "python",
    "java",
    "c",
    "c++",
    "typescript",
    "jquery",
    "mysql",
  ];
  return (
    <div className="navWrapper pt-4">
      <nav className="navbar d-flex justify-content-between align-items-center ">
        <div className="logoWrapper">
          <Link to="/">
            <img className="logo" src={codinghubLogo} />
          </Link>
        </div>
        <div className="searchbar">
          <IoIosSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Search..."
            name="search"
            className="form-control searchInput"
          />
        </div>
        <div className="userActions d-flex align-items-center justify-content-center">
          <div className="profile d-flex align-items-center justify-content-center">
            {currUser ? currUser.charAt(0).toUpperCase() : "@"}
          </div>
        </div>
      </nav>
      <div className="languagebar d-flex align-items-center justify-content-between">
        {languages.map((language, index) => (
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            key={index}
            to={`/${language}/home`}
            style={{ textDecoration: "none" }}
          >
            <div className="lan d-flex align-items-center justify-content-center">
              {language}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
