import React, { useState } from "react";
import { Menu, Avatar, MenuItem, Tooltip, IconButton } from "@mui/material";
import { languagesData } from "../languages";
import { useLanguage } from "../context/LanguageContext";
import { FormattedMessage } from "react-intl";
const sizes = {
  sm: 24,
  md: 32,
  lg: 40,
};
export default function LanguageSwitcher(props) {
  //dil contexti
  const { lang, setLang } = useLanguage();

  const [anchorEl, setAnchorEl] = useState(null);

  //menüyü aç
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //menüyü kapat. eğer menu itemı seçilmişte onu setle
  const handleClose = (code = "") => {
    if (code !== "") {
      setLang(code);
    }
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip title={<FormattedMessage id="chooseLanguage" />}>
        <IconButton onClick={handleClick} sx={{ p: 0 }} {...props}>
          <Avatar
            sx={{
              width: sizes[props.size] ?? 32,
              height: sizes[props.size] ?? 32,
            }}
            alt={languagesData.find((e) => e.code === lang).name}
            src={languagesData.find((e) => e.code === lang).flag}
          />
        </IconButton>
      </Tooltip>

      <Menu
        id="languages-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "current-language",
        }}
      >
        {languagesData.map((item, index) => (
          <MenuItem key={index} onClick={() => handleClose(item.code)}>
            <Avatar
              alt={item.name}
              src={item.flag}
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
