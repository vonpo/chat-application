import React from "react";
import { shallow } from "enzyme";
import { Settings } from "../../src/components/settings";
import { beforeEach, describe, expect } from "@jest/globals";

describe("<Settings/> spec", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Settings />);
  });

  test("Should get messages", () => {
    expect(wrapper.find('[name="white"]')).toHaveLength(1);
    expect(wrapper.find('[name="dateFormat"]')).toHaveLength(1);
    expect(wrapper.find("#change-language-select")).toHaveLength(1);
  });
});
