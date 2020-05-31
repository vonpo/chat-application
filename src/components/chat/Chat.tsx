import * as React from "react";
import {
  FunctionComponent,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { SettingsContext } from "../../store/settings";
import { useChatContext } from "../../store/chat/chatContext";
import { format } from "date-fns";
import { ChatMessage as ChatMessageProps } from "../../store/interfaces/ChatMessage";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";

interface ChatProps {}

export const ChatMessage: FunctionComponent<ChatMessageProps> = ({
  text,
  id,
  date,
}) => {
  const { state } = useContext(SettingsContext);
  const dateFormat =
    state.dateFormat === "12HourFormat" ? "h mm:ss a" : "HH mm:ss";

  return (
    <div key={id}>
      {text}
      <div>{format(new Date(date), dateFormat)}</div>
    </div>
  );
};
export const AddChatMessage: FunctionComponent = ({}) => {
  const { dispatch } = useChatContext();
  const [message, setMessage] = useState("");

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const addMessage = () => {
    dispatch({
      type: "AddChatMessage",
      value: {
        author: "marcin",
        date: Date.now(),
        id: Date.now().toString(),
        text: message,
      },
    });
    setMessage("");
  };

  return (
    <>
      <TextField label="message" value={message} onChange={onTextChange} />
      <Button onClick={addMessage}>Add message</Button>
    </>
  );
};

export const ChatMessages: FunctionComponent = ({}) => {
  const {
    state: { messages },
  } = useChatContext();

  return (
    <>
      {messages.map((app, index) => (
        <ChatMessage {...app} key={index + "a"} />
      ))}
    </>
  );
};

export const Chat: FunctionComponent<ChatProps> = ({}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    state: { messages },
  } = useChatContext();

  useEffect(() => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div>
      <h1>Chat</h1>
      <ChatMessages />
      <AddChatMessage />
      <div ref={messagesEndRef} id="end" />
    </div>
  );
};
