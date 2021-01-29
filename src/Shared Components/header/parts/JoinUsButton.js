import React from "react";
import { Link } from "react-router-dom";

function JoinUsButton() {
  return (
    <div className="join-us-button-div">
      <Link to="/joinclub">
        <input className="join-us-button" value="Club Sanction Application" />
      </Link>
    </div>
  );
}

export default JoinUsButton;
