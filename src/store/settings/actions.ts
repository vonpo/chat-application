type SetDarkTheme = {
  readonly type: "SetDarkTheme";
};

type SetWhiteTheme = {
  readonly type: "SetWhiteTheme";
};

type ChaneLanguage = {
  readonly type: "ChangeLanguage";
  readonly value: string;
};

type ChangeSendType = {
  readonly type: "ChangeSendType";
  readonly value: boolean;
};

type ChangeDateFormat = {
  readonly type: "ChangeDateFormat";
  readonly value: string;
};

type SetUser = {
  readonly type: "SetUser";
  readonly value: string;
};

type ResetSettings = {
  readonly type: "ResetSettings";
};

export type Actions =
  | SetDarkTheme
  | SetWhiteTheme
  | ChaneLanguage
  | ChangeDateFormat
  | ChangeSendType
  | SetUser
  | ResetSettings;
