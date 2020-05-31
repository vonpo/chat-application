import * as React from "react";
import { FunctionComponent } from "react";

interface ChatMessageProps {
  id: string;
  text: string;
}

const ChatMessage: FunctionComponent<ChatMessageProps> = ({ text, id }) => {
  return <div key={id}>{text}</div>;
};

const chatMessages: ChatMessageProps[] = Array.from(Array(200).keys()).map(
  (e, index) => ({
    text: "asdas" + index,
    id: "test" + index,
  })
);

export const Chat: FunctionComponent = () => {
  return <div>{chatMessages.map(ChatMessage)}</div>;
};
