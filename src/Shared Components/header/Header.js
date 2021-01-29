import React, { useState } from "react";
import Logo from "./parts/Logo";
import Bar from "./parts/Bar";
import JoinUsButton from "./parts/JoinUsButton";
import Menu from "./parts/Menu";
import Dropdown from "./parts/Dropdown";

function Header() {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="header w100per">
      <div className="header-container">
        <nav>
          <Logo />
          <Bar />
          <div className="right-bundle">
            <JoinUsButton />
            <Menu click={toggleVisibility} />
          </div>
        </nav>
      </div>
      <Dropdown click={toggleVisibility} visible={visible} />
    </div>
  );
}

export default Header;
