import * as React from "react";
import {
  FunctionComponent,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SettingsContext, useSettingsContext } from "settingsStore";
import { useChatContext } from "../../store/chat/chatContext";
import { format } from "date-fns";
import { ChatMessage as ChatMessageProps } from "../../store/chat/ChatMessage";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Styles from "./chat.module.less";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { useUser } from "../../store/user/userContext";

/**
 * Display chat message.
 *
 * @param {string} author
 * @param {string} text
 * @param {string} id
 * @param {string} userId
 * @param {number} date
 * @constructor
 */
export const ChatMessage: FunctionComponent<ChatMessageProps> = ({
  author,
  text,
  id,
  userId,
  date,
}) => {
  const user = useUser();
  const { state } = useContext(SettingsContext);
  const dateFormat =
    state.dateFormat === "12HourFormat" ? "h mm:ss a" : "HH mm:ss";
  const isOwner = user.id === userId;

  return (
    <Grid
      key={id}
      container
      className={Styles.chatMessage}
      direction="column"
      alignItems={isOwner ? "flex-end" : "flex-start"}
    >
      <Typography variant="caption">
        {format(new Date(date), dateFormat)}
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify={isOwner ? "flex-end" : "flex-start"}
      >
        {!isOwner && (
          <Avatar title={author} className={Styles.avatar}>
            {author ? author[0].toUpperCase() : "?"}
          </Avatar>
        )}
        <Paper className={Styles.message}>
          <pre className={Styles.messageText}>{text}</pre>
        </Paper>
      </Grid>
    </Grid>
  );
};

/**
 * Chat message button.
 *
 * Responsible for adding new chat message.
 *
 * @constructor
 */
export const AddChatMessage: FunctionComponent = ({}) => {
  const { id } = useUser();
  const { state } = useSettingsContext();
  const { sendMessage } = useChatContext();
  const [message, setMessage] = useState("");

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const addMessage = () => {
    if (message.length === 0) {
      return;
    }

    sendMessage({
      userId: id,
      author: state.userName,
      text: message,
    });
    // dispatch({
    //   type: "AddChatMessage",
    //   value: {
    //     userId: id,
    //     author: state.userName,
    //     date: Date.now(),
    //     id: Date.now().toString(),
    //     text: message,
    //   },
    // });
    setMessage("");
  };

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    const commandKey = e.ctrlKey || e.metaKey;
    const wasEnter = e.key === "Enter";

    if (state.sendOnCtrlEnter && commandKey && wasEnter) {
      addMessage();
    }
  };

  return (
    <>
      <TextField
        label="message"
        value={message}
        multiline
        onChange={onTextChange}
        onKeyDown={handleSubmit}
      />
      <Button onClick={addMessage}>Add message</Button>
    </>
  );
};

/**
 * Chat messages component.
 *
 * Responsible for displaying chat list.
 *
 * @constructor
 */
export const ChatMessages: FunctionComponent = ({}) => {
  const {
    state: { messages },
  } = useChatContext();

  return (
    <>
      {messages.map((app, index) => (
        <ChatMessage {...app} key={index + "key"} />
      ))}
    </>
  );
};

/**
 * Chat component.
 *
 * Responsible for displaying chat message.
 * Manages scroll state and auto-scroll to last message.
 *
 * @constructor
 */
export const Chat: FunctionComponent = () => {
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
      <ChatMessages />
      <div ref={messagesEndRef} id="end" />
    </div>
  );
};
