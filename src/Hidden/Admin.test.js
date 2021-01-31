import React from "react";
import Admin from "./Admin";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<Admin />);
});
