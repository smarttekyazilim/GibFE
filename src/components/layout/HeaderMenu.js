import { useState, useCallback, useMemo } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Autocomplete, Collapse, TextField, Tooltip } from "@mui/material";
import { FormattedMessage, injectIntl } from "react-intl";
import { NavLink, useNavigate } from "react-router-dom";
import { FilteredLinks } from "../../routes/SiteLinks";
import Header from "./Header";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LayersIcon from "@mui/icons-material/Layers";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../../context/AuthContext";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import parse from "autosuggest-highlight/parse"; //autocomplete match highlight
import match from "autosuggest-highlight/match"; //autocomplete match highlight
export const drawerWidth = 320;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  paddingLeft: "1rem",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function HeaderMenu({ intl, children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const IntlTranslate = useCallback((id) => intl.formatMessage({ id }), [intl]);

  const { pages } = useAuth();
  const LINKS = useMemo(() => {
    return FilteredLinks(pages === null ? [] : pages.ALLOWED_PAGES);
  }, [pages]);

  //Tüm Menu altındaki sayfaları çevirir
  // const ALL_PAGES = useMemo(() => {
  //   const flattenedMenu = [];
  //   for (const category in LINKS) {
  //     const categoryItems = LINKS[category];
  //     categoryItems.forEach((item) => {
  //       flattenedMenu.push({
  //         id: item.id,
  //         path: item.path,
  //         name: IntlTranslate(item.name),
  //       });
  //     });
  //   }
  //   return flattenedMenu;
  // }, [LINKS, IntlTranslate]);

  //Gib dışında tüm Menu altındaki sayfaları çevirir
  const ALL_PAGES = useMemo(() => {
    const flattenedMenu = [];
    for (const category in LINKS) {
      if (category === "gib") continue;
      const categoryItems = LINKS[category];
      categoryItems.forEach((item) => {
        flattenedMenu.push({
          id: item.id,
          path: item.path,
          name: IntlTranslate(item.name),
        });
      });
    }
    return flattenedMenu;
  }, [LINKS, IntlTranslate]);



  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(null);
  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const [pagesMenuOpen, setPagesMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [gibMenuOpen, setGibMenuOpen] = useState(false);
  //Çalışan kısım
  // const GenerateLinks = useCallback(
  //   (TooltipIconName, name, state, setState, links, hasDivider = true) => {
  //     return links.length > 0 ? (
  //       <>
  //         <Tooltip
  //           arrow
  //           title={<FormattedMessage id={name} />}
  //           placement="right"
  //         >
  //           <ListItem disablePadding sx={{ display: "block" }}>
  //             <ListItemButton
  //               sx={{
  //                 justifyContent: open ? "initial" : "center",
  //                 px: 2.5,
  //               }}
  //               onClick={() => setState(!state)}
  //             >
  //               <ListItemIcon
  //                 sx={{
  //                   minWidth: 0,
  //                   mr: open ? 3 : "auto",
  //                   justifyContent: "center",
  //                   color: "inherit",
  //                 }}
  //               >
  //                 <TooltipIconName />
  //               </ListItemIcon>
  //               <ListItemText sx={{ opacity: open ? 1 : 0 }}>
  //                 <FormattedMessage id={name} />
  //               </ListItemText>
  //               <ListItemIcon
  //                 sx={{
  //                   minWidth: 0,
  //                   mr: open ? 0 : "auto",
  //                   justifyContent: "center",
  //                   opacity: open ? 1 : 0,
  //                   width: open ? "unset" : 0,
  //                 }}
  //               >
  //                 {state ? <ExpandLess /> : <ExpandMore />}
  //               </ListItemIcon>
  //             </ListItemButton>
  //           </ListItem>
  //         </Tooltip>
  //         <Collapse in={state} timeout="auto" unmountOnExit>
  //           <List dense disablePadding>
  //             {links.map((item, index) => (
  //               <Tooltip
  //                 key={index}
  //                 arrow
  //                 title={<FormattedMessage id={item.name} />}
  //                 placement="right"
  //               >
  //                 <ListItem disablePadding sx={{ display: "block" }}>
  //                   <ListItemButton
  //                     sx={{
  //                       justifyContent: open ? "initial" : "center",
  //                       pl: open ? 4 : 2.5,
  //                       "&.active": {
  //                         backgroundColor: "rgba(225, 5, 20, 0.16);",
  //                         color: "rgba(225, 5, 20, 1);",
  //                       },
  //                     }}
  //                     end
  //                     component={NavLink}
  //                     to={item.path}
  //                   >
  //                     <ListItemIcon
  //                       sx={{
  //                         minWidth: 0,
  //                         mr: open ? 3 : "auto",
  //                         justifyContent: "center",
  //                         color: "inherit",
  //                       }}
  //                     >
  //                       {item.icon}
  //                     </ListItemIcon>
  //                     <ListItemText sx={{ opacity: open ? 1 : 0 }}>
  //                       <FormattedMessage id={item.name} />
  //                     </ListItemText>
  //                   </ListItemButton>
  //                 </ListItem>
  //               </Tooltip>
  //             ))}
  //           </List>
  //         </Collapse>
  //         {hasDivider && (
  //           <Divider sx={{ my: 1, borderBottomWidth: "medium" }} />
  //         )}
  //       </>
  //     ) : null;
  //   },
  //   [open]
  // );

  //Gib için çeviri kapalı 
  // const GenerateLinks = useCallback(
  //   (TooltipIconName, name, state, setState, links, hasDivider = true, isGib = false) => {
  //     return links.length > 0 ? (
  //       <>
  //         <Tooltip
  //           arrow
  //           title={<FormattedMessage id={name} />}
  //           placement="right"
  //         >
  //           <ListItem disablePadding sx={{ display: "block" }}>
  //             <ListItemButton
  //               sx={{
  //                 justifyContent: open ? "initial" : "center",
  //                 px: 2.5,
  //               }}
  //               onClick={() => setState(!state)}
  //             >
  //               <ListItemIcon
  //                 sx={{
  //                   minWidth: 0,
  //                   mr: open ? 3 : "auto",
  //                   justifyContent: "center",
  //                   color: "inherit",
  //                 }}
  //               >
  //                 <TooltipIconName />
  //               </ListItemIcon>
  //               <ListItemText sx={{ opacity: open ? 1 : 0 }}>
  //                 <FormattedMessage id={name} />
  //               </ListItemText>
  //               <ListItemIcon
  //                 sx={{
  //                   minWidth: 0,
  //                   mr: open ? 0 : "auto",
  //                   justifyContent: "center",
  //                   opacity: open ? 1 : 0,
  //                   width: open ? "unset" : 0,
  //                 }}
  //               >
  //                 {state ? <ExpandLess /> : <ExpandMore />}
  //               </ListItemIcon>
  //             </ListItemButton>
  //           </ListItem>
  //         </Tooltip>
  //         <Collapse in={state} timeout="auto" unmountOnExit>
  //           <List dense disablePadding>
  //             {links.map((item, index) => (
  //               <Tooltip
  //                 key={index}
  //                 arrow
  //                 title={isGib ? item.name : <FormattedMessage id={item.name} />}
  //                 placement="right"
  //               >
  //                 <ListItem disablePadding sx={{ display: "block" }}>
  //                   <ListItemButton
  //                     sx={{
  //                       justifyContent: open ? "initial" : "center",
  //                       pl: open ? 4 : 2.5,
  //                       "&.active": {
  //                         backgroundColor: "rgba(225, 5, 20, 0.16);",
  //                         color: "rgba(225, 5, 20, 1);",
  //                       },
  //                     }}
  //                     end
  //                     component={NavLink}
  //                     to={item.path}
  //                   >
  //                     <ListItemIcon
  //                       sx={{
  //                         minWidth: 0,
  //                         mr: open ? 3 : "auto",
  //                         justifyContent: "center",
  //                         color: "inherit",
  //                       }}
  //                     >
  //                       {item.icon}
  //                     </ListItemIcon>
  //                     <ListItemText sx={{ opacity: open ? 1 : 0 }}>
  //                       {isGib ? item.name : <FormattedMessage id={item.name} />}
  //                     </ListItemText>
  //                   </ListItemButton>
  //                 </ListItem>
  //               </Tooltip>
  //             ))}
  //           </List>
  //         </Collapse>
  //         {hasDivider && (
  //           <Divider sx={{ my: 1, borderBottomWidth: "medium" }} />
  //         )}
  //       </>
  //     ) : null;
  //   },
  //   [open]
  // );

  //Gib Error için açık
  const GenerateLinks = useCallback(
    (TooltipIconName, name, state, setState, links, hasDivider = true, isGib = false) => {
      return links.length > 0 ? (
        <>
          <Tooltip
            arrow
            title={<FormattedMessage id={name} />}
            placement="right"
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => setState(!state)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  <TooltipIconName />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                  <FormattedMessage id={name} />
                </ListItemText>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 0 : "auto",
                    justifyContent: "center",
                    opacity: open ? 1 : 0,
                    width: open ? "unset" : 0,
                  }}
                >
                  {state ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <Collapse in={state} timeout="auto" unmountOnExit>
            <List dense disablePadding>
              {links.map((item, index) => (
                <Tooltip
                  key={index}
                  arrow
                  title={isGib && !item.isGibError ? item.name : <FormattedMessage id={item.name} />}
                  placement="right"
                >
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      sx={{
                        justifyContent: open ? "initial" : "center",
                        pl: open ? 4 : 2.5,
                        "&.active": {
                          backgroundColor: "rgba(225, 5, 20, 0.16);",
                          color: "rgba(225, 5, 20, 1);",
                        },
                      }}
                      end
                      component={NavLink}
                      to={item.path}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: "inherit",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                        {isGib && !item.isGibError ? item.name : <FormattedMessage id={item.name} />}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              ))}
            </List>
          </Collapse>
          {hasDivider && (
            <Divider sx={{ my: 1, borderBottomWidth: "medium" }} />
          )}
        </>
      ) : null;
    },
    [open]
  );
  
  return (
    <Box sx={{ display: "flex" }}>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Autocomplete
            options={ALL_PAGES.sort((a, b) =>
              a.name - b.name ? 1 : b.name > a.name ? -1 : 0
            )}
            fullWidth
            size="small"
            value={selectedPage}
            onChange={(e, newval) => {
              if (newval) {
                setSelectedPage(null);
                navigate(newval.path);
              }
            }}
            noOptionsText="Sayfa Bulunamadı"
            getOptionLabel={(opt) => opt.name}
            renderOption={(props, option, { inputValue }) => {
              let newopt = option.name;
              const matches = match(newopt, inputValue, {
                insideWords: true,
              });
              const parts = parse(newopt, matches);

              return (
                <li {...props}>
                  <div>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: part.highlight ? "#ffff00" : "unset",
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </div>
                </li>
              );
            }}
            blurOnSelect
            autoHighlight
            renderInput={(params) => (
              <TextField
                {...params}
                label={<FormattedMessage id="searchScreen" />}
                variant="standard"
              />
            )}
          />
          <IconButton aria-label="close menu" onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List dense sx={{ color: "#1a1a1a" }}>

          {GenerateLinks(
            LayersIcon,
            "pages",
            pagesMenuOpen,
            setPagesMenuOpen,
            LINKS.menu
          )}
          {/* {GenerateLinks(
            AccountBalanceIcon,
            "gib",
            gibMenuOpen,
            setGibMenuOpen,
            LINKS.gib
          )} */}
          {GenerateLinks(
            AccountBalanceIcon,
            "gib",
            gibMenuOpen,
            setGibMenuOpen,
            LINKS.gib,
            true,
            true // Bu parametre gib için çeviri işlemini kapatır
          )}

          {GenerateLinks(
            SettingsIcon,
            "settings",
            settingsMenuOpen,
            setSettingsMenuOpen,
            LINKS.setting
          )}
        </List>
      </Drawer>
      {children}
    </Box>
  );
}
export default injectIntl(HeaderMenu);
