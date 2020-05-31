import * as React from "react";
import { FunctionComponent, useEffect } from "react";

interface ChatMessageProps {
  id: string;
  text: string;
}

interface ChatProps {}

export const ChatMessage: FunctionComponent<ChatMessageProps> = ({
  text,
  id,
}) => {
  return <div key={id}>{text}</div>;
};

const chatMessages: ChatMessageProps[] = Array.from(Array(200).keys()).map(
  (e, index) => ({
    text: "asdas" + index,
    id: "test" + index,
  })
);

export const Chat: FunctionComponent<ChatProps> = ({}) => {
  return (
    <div>
      <h1>test</h1>
      <ChatMessage id="marcin" text="asdasd" />
      {chatMessages.map(ChatMessage)}
    </div>
  );
};
