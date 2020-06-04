import * as React from "react";
import {
  FunctionComponent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { SettingState, useSettingsContext } from "settingsStore";
import { useChatContext } from "chatStore";
import { format } from "date-fns";
import { ChatMessage as ChatMessageProps } from "../../store/chat/ChatMessage";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Styles from "./chat.module.less";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { useUser } from "../../store/user/userContext";
import SendIcon from "@material-ui/icons/Send";
import EmojiIcon from "@material-ui/icons/EmojiEmotions";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";
import { useDetectPath } from "../../route/useDetectPath";
import { PageView } from "../layout/PageView";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";

const emojis = [
  "🤠",
  "😀",
  "🤐",
  "😄",
  "😁",
  "😆",
  "🥶",
  "😅",
  "🤣",
  "😂",
  "🙂",
  "🥵",
  "🙃",
  "😉",
  "😊",
  "😇",
  "🥰",
  "🤩",
  "🤑",
  "🙄",
];

/**
 * Display chat message.
 *
 * @param message
 * @param userId
 * @param settings
 * @constructor
 */
export const ChatMessage: FunctionComponent<{
  message: ChatMessageProps;
  settings: SettingState;
  userId: string;
}> = ({ message, userId, settings }) => {
  const dateFormat =
    settings.dateFormat === "12HourFormat" ? "h:mm a" : "HH:mm";
  const isOwner = message.userId === userId;

  return (
    <Grid
      key={message.id}
      container
      className={Styles.chatMessage}
      direction="column"
      alignItems={isOwner ? "flex-end" : "flex-start"}
    >
      <Typography variant="caption">
        {format(new Date(message.date), dateFormat)}
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify={isOwner ? "flex-end" : "flex-start"}
      >
        {!isOwner && (
          <Tooltip title={message.author} placement="top-end">
            <Avatar className={Styles.avatar}>
              {message.author ? message.author[0].toUpperCase() : "?"}
            </Avatar>
          </Tooltip>
        )}
        <Paper className={Styles.message}>
          <pre className={Styles.messageText}>{message.text}</pre>
        </Paper>
      </Grid>
    </Grid>
  );
};

/**
 * Add emoji messages.
 *
 * @param {function} onChange
 *
 * @constructor
 */
export const AddEmoji: FunctionComponent<{
  onChange: (emoji: string) => any;
}> = ({ onChange }) => {
  const [openPopover, setPopover] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setPopover(true);
  };

  const handleEmojiClick = (emoji: string) => {
    onChange(emoji);
  };

  return (
    <>
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={() => setPopover(false)}
        transformOrigin={{
          vertical: 220,
          horizontal: "center",
        }}
      >
        <Grid container style={{ maxWidth: 300 }}>
          {emojis.map((emoji, index) => {
            return (
              <IconButton
                key={`emoji${index}`}
                onClick={() => handleEmojiClick(emoji)}
              >
                {emoji}
              </IconButton>
            );
          })}
        </Grid>
      </Popover>
      <IconButton onClick={handleClick}>
        <EmojiIcon />
      </IconButton>
    </>
  );
};

/**
 * Chat message button.
 *
 * Responsible for adding new chat message.
 *
 * @constructor
 */
export const AddChatMessage: FunctionComponent = () => {
  const { t } = useTranslation();
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
    setMessage("");
  };

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    const commandKey = e.ctrlKey || e.metaKey;
    const wasEnter = e.key === "Enter";

    if (state.sendOnCtrlEnter && commandKey && wasEnter) {
      addMessage();
    }
  };

  const onEmojiChange = (emoji: string) => {
    setMessage(message + emoji);
  };

  return (
    <>
      <Box flexGrow={1} className={Styles.inputMessage}>
        <TextField
          fullWidth
          label={t("chatMessage")}
          value={message}
          multiline
          rowsMax={4}
          onChange={onTextChange}
          onKeyDown={handleSubmit}
        />
      </Box>
      <AddEmoji onChange={onEmojiChange} />
      <IconButton onClick={addMessage}>
        <SendIcon />
      </IconButton>
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
export const ChatMessages: FunctionComponent<{
  messages: ChatMessageProps[];
  settings: SettingState;
  userId: string;
}> = ({ messages, settings, userId }) => {
  return (
    <>
      {messages.map((message) => (
        <ChatMessage
          message={message}
          settings={settings}
          userId={userId}
          key={message.id}
        />
      ))}
    </>
  );
};

/**
 * This might be overkill but it show conception to keep messages memoized.
 * As this is main view and if user goes to other page we don't want to remove this component but just hide it.
 *
 * As we don't re-render element it solves issue with scrolling as it keeps current scroll position when we change view.
 */
const MemoizedChatMessages = React.memo(ChatMessages);

/**
 * Chat component.
 *
 * Responsible for displaying chat message.
 * Manages scroll state and auto-scroll to last message.
 *
 * @constructor
 */
export const Chat: FunctionComponent = () => {
  const user = useUser();
  const settings = useSettingsContext();
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
      <MemoizedChatMessages
        messages={messages}
        userId={user.id}
        settings={settings.state}
      />
      <div ref={messagesEndRef} />
    </div>
  );
};

/**
 * Page view for chat tab.
 * @constructor
 */
export const ChatPage: FunctionComponent = () => {
  const isMainTab = useDetectPath("/");

  return (
    <PageView hide={!isMainTab}>
      <Chat />
    </PageView>
  );
};
