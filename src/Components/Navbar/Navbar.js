import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    // marginRight: theme.spacing(2),
    backgroundColor: "#141B2F",
  },
  title: {
    flexGrow: 1,
    color: "#FF8F40",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          FE Academy
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
