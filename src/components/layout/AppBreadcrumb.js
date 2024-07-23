import React from "react";
import { Link as RouteLink } from "react-router-dom";
import { Breadcrumbs, Typography, Link, Box, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import IntlTranslate from "../../helpers/IntlTranslate";
import AddIcon from "@mui/icons-material/Add";
import LayersClearRoundedIcon from "@mui/icons-material/LayersClearRounded";
import { Link as RouterLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
function AppBreadcrumb({
  links = [],
  addButton = null,
  extra = null,
  resetPageButton = null,
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 3, height: "2rem" }}>
      {links.length > 0 && (
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              title={IntlTranslate("home")}
              underline="none"
              color="inherit"
              sx={{ display: "flex", alignItems: "center" }}
              component={RouteLink}
              to="/"
            >
              <HomeIcon />
            </Link>
            {links.map((item, index) => {
              if (item.active) {
                return (
                  <Typography key={index} color="text.primary">
                    {item.name}
                  </Typography>
                );
              } else {
                return (
                  <Link
                    key={index}
                    underline="hover"
                    color="inherit"
                    component={RouteLink}
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                );
              }
            })}
          </Breadcrumbs>
        </div>
      )}
      <Box ml="auto">{extra}</Box>
      {resetPageButton && (
        <Button
          color="primary"
          variant="outlined"
          size="small"
          startIcon={<LayersClearRoundedIcon />}
          sx={{ ml: 2 }}
          onClick={resetPageButton}
        >
          <FormattedMessage id="clearPage" />
        </Button>
      )}
      {addButton && (
        <Button
          color="secondary"
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          component={RouterLink}
          to={addButton?.path || "add"}
          sx={{ ml: 2 }}
        >
          <FormattedMessage id={addButton.name} />
        </Button>
      )}
    </Box>
  );
}

export default React.memo(AppBreadcrumb);
