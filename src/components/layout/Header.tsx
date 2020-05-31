import * as React from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import { useTranslation } from "react-i18next";
import { useChatContext } from "../../store/chat/chatContext";

export const Header: FunctionComponent = () => {
  const { t } = useTranslation();
  const { state } = useChatContext();

  return (
    <AppBar position="relative">
      <nav>
        <Link to="/">
          <Button>
            {t("chat")}({state.messages.length})
          </Button>
        </Link>
        <Link to="/settings">{t("settings")}</Link>
      </nav>
    </AppBar>
  );
};
