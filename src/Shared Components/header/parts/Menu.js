import React from "react";
import { BiMenu } from "react-icons/bi";
import { IconContext } from "react-icons";

function Menu(props) {
  const { click } = props;
  return (
    <div className="menu" onClick={click}>
      <div className="menu-container">
        <div className="menu-icon-container">
          <IconContext.Provider value={{ size: "1.5em" }}>
            <BiMenu />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default Menu;
