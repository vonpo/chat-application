import * as React from "react";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { SettingsContext } from "settingsStore";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormControl } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Styles from "./settings.module.less";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const ResetSettings: FunctionComponent = () => {
  const { dispatch } = useContext(SettingsContext);
  const onReset = () => dispatch({ type: "ResetSettings" });

  return <Button onClick={onReset}>Reset</Button>;
};

export const Settings: FunctionComponent = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(SettingsContext);
  const [userName, setUsername] = useState(state.userName);

  useEffect(() => {
    setUsername(state.userName);
  }, [state.userName]);

  const handleInterfaceColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const actionType =
      event.target.value === "light" ? "SetWhiteTheme" : "SetDarkTheme";
    console.info("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
    dispatch({ type: actionType });
  };

  const changeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const language = event.target.value;

    i18n.changeLanguage(language);
    dispatch({ type: "ChangeLanguage", value: language });
  };

  const handleDateFormatChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({ type: "ChangeDateFormat", value: event.target.value });
  };

  const handleSendTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "ChangeSendType",
      value: event.target.value === "sendOnCtrlEnter",
    });
  };

  const onUserTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onUserFieldBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: "SetUser",
      value: event.target.value,
    });
  };

  return (
    <Grid container direction="column">
      <FormControl component="fieldset" className={Styles.formControl}>
        <FormLabel component="legend">{t("settingsUsername")}</FormLabel>
        <TextField
          name="userName"
          value={userName}
          onChange={onUserTextChange}
          onBlur={onUserFieldBlur}
        />
      </FormControl>
      <FormControl component="fieldset" className={Styles.formControl}>
        <FormLabel component="legend">{t("settingInterfaceColor")}</FormLabel>
        <RadioGroup
          className={Styles.formGroup}
          aria-label="interfaceColor"
          name="interfaceColor"
          value={state.isDark ? "dark" : "light"}
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
          value={state.language}
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
          value={state.dateFormat}
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
            state.sendOnCtrlEnter ? "sendOnCtrlEnter" : "sendOnCtrlEnterFalse"
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
    </Grid>
  );
};
