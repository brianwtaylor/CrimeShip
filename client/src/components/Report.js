import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import Context from '../context';
import NoContent from './Pin/NoContent';
import CreatePin from './Pin/CreatePin';
import PinContent from './Pin/PinContent';

const Report = ({ classes }) => {
  const mobileSize = useMediaQuery('(max-width: 650px)')
  const { state } = useContext(Context)
  const { draft, currentPin } = state

  let ReportContent;
  if (!draft && !currentPin) {
    // nocontent
    ReportContent = NoContent
  } else if (draft && !currentPin) {
    // create pin
    ReportContent = CreatePin
  } else if (!draft && currentPin) {
    ReportContent = PinContent
  }

  return (
    <Paper className={mobileSize ? classes.rootMobile : classes.root}>
      <ReportContent />
    </Paper>
  )
};

const styles = {
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center"
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll"
  }
};

export default withStyles(styles)(Report);
