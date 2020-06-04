import * as React from "react";
import { FunctionComponent, Reducer, useReducer } from "react";
import { SettingState, useSettingsContext } from "settingsStore";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormControl } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Styles from "./settings.module.less";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { PageView } from "../layout/PageView";

export const ResetSettings: FunctionComponent = () => {
  const { dispatch } = useSettingsContext();
  const onReset = () => dispatch({ type: "ResetSettings" });

  return (
    <Button onClick={onReset} fullWidth>
      Reset
    </Button>
  );
};

type Action = {
  name: "ChangeState";
  value: object;
};

interface FromState extends SettingState {
  isDirty?: boolean;
}

const reducer = (state: FromState, action: Action) => {
  switch (action.name) {
    case "ChangeState":
      return {
        ...state,
        ...action.value,
        isDirty: true,
      };
  }

  return state;
};
export const Settings: FunctionComponent = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useSettingsContext();
  const [formState, formDispatch] = useReducer<Reducer<FromState, Action>>(
    reducer,
    state
  );

  const handleInterfaceColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    formDispatch({
      name: "ChangeState",
      value: { isDark: event.target.value === "dark" },
    });
  };

  const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language = event.target.value;

    formDispatch({
      name: "ChangeState",
      value: { language },
    });
  };

  const handleDateFormatChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    formDispatch({
      name: "ChangeState",
      value: { dateFormat: event.target.value },
    });
  };

  const handleSendTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formDispatch({
      name: "ChangeState",
      value: { sendOnCtrlEnter: event.target.value === "sendOnCtrlEnter" },
    });
  };

  const onUserTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formDispatch({
      name: "ChangeState",
      value: { userName: event.target.value },
    });
  };

  const saveHandler = () => {
    if (formState.language !== state.language) {
      i18n.changeLanguage(formState.language);
    }

    dispatch({
      type: "SetSettings",
      value: {
        ...formState,
        isDirty: undefined,
      },
    });
  };

  return (
    <Grid container direction="column">
      <FormControl component="fieldset" className={Styles.formControl}>
        <FormLabel component="legend">{t("settingsUsername")}</FormLabel>
        <TextField
          name="userName"
          value={formState.userName}
          onChange={onUserTextChange}
        />
      </FormControl>
      <FormControl component="fieldset" className={Styles.formControl}>
        <FormLabel component="legend">{t("settingInterfaceColor")}</FormLabel>
        <RadioGroup
          className={Styles.formGroup}
          aria-label="interfaceColor"
          name="interfaceColor"
          value={formState.isDark ? "dark" : "light"}
          onChange={handleInterfaceColorChange}
        >
          <FormControlLabel
            value="light"
            control={<Radio />}
            label={t("settingInterfaceColorLight")}
          />
          <FormControlLabel
            value="dark"
            control={<Radio />}
            label={t("settingInterfaceColorDark")}
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className={Styles.formControl}>
        <FormLabel id="change-language-label" component="legend">
          {t("settingLanguage")}
        </FormLabel>
        <Select
          labelId="change-language-label"
          id="change-language-select"
          value={formState.language}
          onChange={changeLanguage}
        >
          <MenuItem value="en">{t("settingLanguageEN")}</MenuItem>
          <MenuItem value="pl">{t("settingLanguagePL")}</MenuItem>
          <MenuItem value="de">{t("settingLanguageDE")}</MenuItem>
        </Select>
      </FormControl>
      <FormControl component="fieldset" className={Styles.formControl}>
        <FormLabel component="legend">{t("settingDateFormat")}</FormLabel>
        <RadioGroup
          aria-label="dateFormat"
          className={Styles.formGroup}
          name="dateFormat"
          value={formState.dateFormat}
          onChange={handleDateFormatChange}
        >
          <FormControlLabel
            value="12HourFormat"
            control={<Radio />}
            label={t("settingDateFormat12H")}
          />
          <FormControlLabel
            value="24HourFormat"
            control={<Radio />}
            label={t("settingDateFormat24H")}
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className={Styles.formControl}>
        <FormLabel component="legend">{t("settingSend")}</FormLabel>
        <RadioGroup
          className={Styles.formGroup}
          aria-label="sendType"
          name="sendType"
          value={
            formState.sendOnCtrlEnter
              ? "sendOnCtrlEnter"
              : "sendOnCtrlEnterFalse"
          }
          onChange={handleSendTypeChange}
        >
          <FormControlLabel
            value="sendOnCtrlEnter"
            control={<Radio />}
            label={t("settingSendCtrlEnterOn")}
          />
          <FormControlLabel
            value="sendOnCtrlEnterFalse"
            control={<Radio />}
            label={t("settingSendCtrlEnterOff")}
          />
        </RadioGroup>
      </FormControl>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={saveHandler}
          disabled={!formState.isDirty}
        >
          {t("settingsSave")}
        </Button>
      </Grid>
    </Grid>
  );
};

export const SettingsPage: FunctionComponent = () => {
  return (
    <PageView>
      <Settings />
    </PageView>
  );
};
