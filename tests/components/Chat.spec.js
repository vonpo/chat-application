import React from "react";
import { shallow } from "enzyme";
import { Chat, ChatMessage } from "../../src/components/chat";

describe("<Chat/> spec", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Chat loadMessages={() => []} />);
  });

  test("Should get messages", () => {
    expect(wrapper.find("h1")).toHaveLength(1);
    expect(wrapper.find(ChatMessage)).toHaveProp("id", "marcin");
  });
});
