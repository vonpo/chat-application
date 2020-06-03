import React from "react";
import { shallow } from "enzyme";
import { ChatMessages, Chat, ChatMessage } from "../../src/components/chat";
import { describe, expect } from "@jest/globals";
import Avatar from "@material-ui/core/Avatar";

describe("<ChatMessage/> spec", () => {
  let settings;
  let message;

  test("should not display Avatar when owner writes a message", () => {
    settings = {
      userName: "test",
      language: "en",
      dateFormat: "test",
      sendOnCtrlEnter: false,
      isDark: false,
    };
    message = {
      id: "1",
      text: "test",
      author: "test",
      date: "1234",
      userId: "test",
    };

    const wrapper = shallow(
      <ChatMessage userId="test" settings={settings} message={message} />
    );
    expect(wrapper.find(Avatar)).toHaveLength(0);
  });

  test("should display Avatar when other user writes a message", () => {
    settings = {
      userName: "test",
      language: "en",
      dateFormat: "test",
      sendOnCtrlEnter: false,
      isDark: false,
    };
    message = {
      id: "1",
      text: "test2",
      author: "test",
      date: "1234",
      userId: "test",
    };

    const wrapper = shallow(
      <ChatMessage userId="test" settings={settings} message={message} />
    );
    expect(wrapper.find(Avatar)).toHaveLength(0);
  });
});

describe("<Chat/> spec", () => {
  test("should display: header, chat messages and add chat messaged button", () => {
    const wrapper = shallow(<Chat />);
    expect(wrapper.find(ChatMessages)).toHaveLength(1);
  });
});

describe("<ChatMessages/> spec", () => {
  let wrapper;
  let settings;
  let messages;
  let user;

  test("should display: chat messages", () => {
    settings = {
      userName: "test",
      language: "en",
      dateFormat: "test",
      sendOnCtrlEnter: false,
      isDark: false,
    };

    messages = [
      {
        id: "1",
        text: "test",
        author: "test",
        date: "1234",
        userId: "test",
      },
      {
        id: "2",
        text: "test",
        author: "test",
        date: "1234",
        userId: "test",
      },
    ];

    user = {
      id: "test",
    };
    wrapper = shallow(
      <ChatMessages settings={settings} messages={messages} userId={user.id} />
    );
    expect(wrapper.find(ChatMessage)).toHaveLength(2);
  });

  test("should display empty chat messages", () => {
    settings = {
      userName: "test",
      language: "en",
      dateFormat: "test",
      sendOnCtrlEnter: false,
      isDark: false,
    };

    messages = [];
    user = {
      id: "test",
    };

    wrapper = shallow(
      <ChatMessages settings={settings} messages={messages} userId={user.id} />
    );
    expect(wrapper.find(ChatMessage)).toHaveLength(0);
  });
});
