import React from "react";
import { shallow } from "enzyme";
import { Settings } from "../../src/components/settings";

describe.skip("<Settings/> spec", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Settings />);
  });

  test("Should get messages", () => {
    expect(wrapper.find("h1")).toHaveLength(1);
    expect(wrapper.find("h1")).toHaveLength(1);
  });
});
