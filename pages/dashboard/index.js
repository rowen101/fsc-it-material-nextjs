import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Image from "next/image";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import LandscapeRoundedIcon from "@material-ui/icons/LandscapeRounded";
import HomeWorkRoundedIcon from "@material-ui/icons/HomeWorkRounded";
import LocalShippingRoundedIcon from "@material-ui/icons/LocalShippingRounded";
import SquareFootRoundedIcon from "@material-ui/icons/SquareFootRounded";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  gridmain: {
    marginTop: 10,
  },
  paper: {
    margin: 5,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 140,
    width: 110,
    bottom: 0,
    left: 0,
  },
  fonticon: {
    fontSize: 50,
    color: theme.palette.text.primary,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function index() {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Dashboard</Typography>
      </Breadcrumbs>
      <Grid item xs={12} className={classes.gridmain}>
        <Grid container justify="center" spacing={spacing}></Grid>
      </Grid>
    </div>
  );
}
