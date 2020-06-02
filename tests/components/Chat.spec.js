import React from "react";
import { shallow } from "enzyme";
import { ChatMessages, Chat, AddChatMessage } from "../../src/components/chat";
import { beforeEach, describe, expect } from "@jest/globals";

describe("<Chat/> spec", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Chat />);
  });

  test("should display: header, chat messages and add chat messaged button", () => {
    expect(wrapper.find(ChatMessages)).toHaveLength(1);
  });
});
