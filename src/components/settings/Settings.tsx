import * as React from "react";
import { FunctionComponent, useContext } from "react";
import { SettingsContext } from "../../store/settings";
import i18n from "i18next";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormControl } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export const Settings: FunctionComponent = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(SettingsContext);
  const setDark = () => {
    dispatch({ type: "SetDarkTheme" });
  };
  const setWhite = () => {
    dispatch({ type: "SetWhiteTheme" });
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

  return (
    <Grid container direction="column">
      <Typography>{t("settings")}</Typography>
      <Button name="white" onClick={setDark}>
        {t("settingThemeDark")}
      </Button>
      <Button onClick={setWhite}>{t("settingThemeLite")}</Button>
      <FormControl>
        <InputLabel id="change-language-label">
          {t("settingLanguage")}
        </InputLabel>
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
      <FormControl component="fieldset">
        <FormLabel component="legend">{t("settingDateFormat")}</FormLabel>
        <RadioGroup
          aria-label="dateFormat"
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
    </Grid>
  );
};
