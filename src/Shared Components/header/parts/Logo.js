import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../media/circle-cropped.png";

function Logo() {
  return (
    <div className="logo">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src={logo} alt="whippet" />
        </Link>
      </div>
    </div>
  );
}

export default Logo;
