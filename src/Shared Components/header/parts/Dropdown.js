import React from "react";
import { pageLinks } from "../../../helpers/nav-link-list";
import { Link } from "react-router-dom";

function Dropdown(props) {
  const { visible, click } = props;
  const barLinks = pageLinks.map((l, index) => {
    return (
      <div key={index} onClick={click} className="nav-data w100per">
        <div className="nav-link">
          <Link to={l.link}>{l.page}</Link>
        </div>
      </div>
    );
  });

  const isVisible = visible ? "nav-open" : "nav-closed";

  return (
    <div className={`dropdown ${isVisible} w100per`}>
      <div className="dropdown-navigation">{barLinks}</div>
    </div>
  );
}

export default Dropdown;
