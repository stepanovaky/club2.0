import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { Menu, Segment, Form } from "semantic-ui-react";
import FindDog from "./FindDog";
import FindOwner from "./FindOwner";
import RegisterEvent from "./RegisterEvent";
import FindEvent from "./FindEvent";
import Log from "./Log";

// /2946fec9-4210-4aea-a828-fa315bad9a43

function Admin() {
  const [activeItem, setActiveItem] = useState();

  return (
    <div className="admin">
      <div className="container">
        {/* <div className="frame"> */}
        <div className="retrieve-data">
          <Segment inverted>
            <Menu inverted pointing secondary fluid widths={5}>
              <Menu.Item
                name="findDog"
                active={activeItem === "findDog"}
                onClick={() => setActiveItem("findDog")}
              >
                Find Dog
              </Menu.Item>
              <Menu.Item
                name="findOwner"
                active={activeItem === "findOwner"}
                onClick={() => setActiveItem("findOwner")}
              >
                Find Owner
              </Menu.Item>
              <Menu.Item
                name="findEvent"
                active={activeItem === "findEvent"}
                onClick={() => setActiveItem("findEvent")}
              >
                Find Event
              </Menu.Item>
              <Menu.Item
                name="registerEvent"
                active={activeItem === "registerEvent"}
                onClick={() => setActiveItem("registerEvent")}
              >
                Register Event
              </Menu.Item>
              <Menu.Item
                name="log"
                active={activeItem === "log"}
                onClick={() => setActiveItem("log")}
              >
                Log
              </Menu.Item>
            </Menu>
          </Segment>
        </div>

        {activeItem === "findDog" ? <FindDog /> : null}
        {activeItem === "findOwner" ? <FindOwner /> : null}
        {activeItem === "registerEvent" ? <RegisterEvent /> : null}
        {activeItem === "findEvent" ? <FindEvent /> : null}
        {activeItem === "log" ? <Log /> : null}
      </div>
    </div>
    // </div>
  );
}

export default Admin;
