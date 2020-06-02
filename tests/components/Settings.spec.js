import React from "react";
import { shallow } from "enzyme";
import { Settings, ResetSettings } from "../../src/components/settings";
import { afterEach, beforeEach, describe, expect } from "@jest/globals";
import { setupContext, restoreContext } from "../__mocks__/settingStore";
import Button from "@material-ui/core/Button";

describe("<Settings/> test interface settings", () => {
  let wrapper;

  beforeEach(() => {
    setupContext({
      isDark: true,
      language: "de",
      userName: "test",
      dateFormat: "12HourFormat",
      sendOnCtrlEnter: false,
    });
    wrapper = shallow(<Settings />);
  });

  test("Should set proper values to settings controls.", () => {
    expect(wrapper.find("[name='interfaceColor']").prop("value")).toEqual(
      "dark"
    );
    expect(wrapper.find("#change-language-select").prop("value")).toEqual("de");
    expect(wrapper.find("[name='userName']").prop("value")).toEqual("test");
    expect(wrapper.find("[name='dateFormat']").prop("value")).toEqual(
      "12HourFormat"
    );
    expect(wrapper.find("[name='dateFormat']").prop("value")).toEqual(
      "12HourFormat"
    );
    expect(wrapper.find("[name='sendType']").prop("value")).toEqual(
      "sendOnCtrlEnterFalse"
    );
  });

  afterEach(() => restoreContext());
});

describe("<ResetSettings />", () => {
  let wrapper;
  let simulateClickStub;

  beforeEach(() => {
    simulateClickStub = jest.fn();
    setupContext(undefined, simulateClickStub);
    wrapper = shallow(<ResetSettings />);
  });

  test("should trigger reset settings", () => {
    wrapper.find(Button).simulate("click");

    expect(simulateClickStub.mock.calls.length).toEqual(1);
  });

  afterEach(() => restoreContext());
});
