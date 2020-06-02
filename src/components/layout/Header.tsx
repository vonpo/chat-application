import * as React from "react";
import { FunctionComponent, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { useTranslation } from "react-i18next";
import {
  useUnreadMessagesContext,
  useChatContext,
} from "../../store/chat/chatContext";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";
import Styles from "./layout.module.less";
import { useDetectPath } from "../../route/useDetectPath";

enum TABS {
  CHAT,
  SETTINGS,
}

/**
 * Header.
 * Displays tab navigation [Chat, Settings].
 *
 * Chat settings has also number of unread messages.
 * @constructor
 */
export const Header: FunctionComponent = () => {
  const isMainTab = useDetectPath("/");
  const history = useHistory();
  const { t } = useTranslation();
  const unReadMessages = useUnreadMessagesContext();
  const { dispatch } = useChatContext();

  const [tab, setTab] = useState(isMainTab ? TABS.CHAT : TABS.SETTINGS);
  const handleTabChange = (event: any, value: number) => {
    const isChatTab = value === TABS.CHAT;

    isChatTab && dispatch({ type: "ReadAllMessages" });
    history.push(isChatTab ? "/" : "/settings");

    setTab(value);
  };
  const unreadMessagesLabel = unReadMessages > 0 ? `(${unReadMessages})` : "";

  return (
    <AppBar position="relative">
      <Tabs
        value={tab}
        onChange={handleTabChange}
        aria-label="simple tabs example"
      >
        <Tab
          label={`${t("chat")}${unreadMessagesLabel}`}
          className={unReadMessages > 0 ? Styles.blinking : ""}
        />
        <Tab label={t("settings")} />
      </Tabs>
    </AppBar>
  );
};
