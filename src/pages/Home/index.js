import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import AppBreadcrumb from "../../components/layout/AppBreadcrumb";
import withTitle from "../../helpers/hoc/withTitle";
import Grid from "@mui/material/Unstable_Grid2";
function Home() {
  const breadcrumb = useMemo(
    () => [{ name: <FormattedMessage id="dashboard" />, active: true }],
    []
  );

  return (
    <>
      <AppBreadcrumb links={breadcrumb} />
      <Grid container spacing={3}>
        <Grid xs={12}>
          <h1>Gelir İdaresi Başkanlığı</h1>
        </Grid>
      </Grid>
    </>
  );
}

export default withTitle(Home, "", false);
