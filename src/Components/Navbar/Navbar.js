import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useLocation, useHistory } from "react-router-dom";
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
  icon: {
    color: "#FF8F40",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  let location = useLocation();
  let history = useHistory();
  const [showReturn, setReturn] = useState(false);
  // shows return button if in codeeditor logic
  useEffect(() => {
    let slash = location.pathname.lastIndexOf("/");
    let word = location.pathname.slice(slash + 1);
    if (word === "CodeEditor") {
      setReturn(true);
    } else {
      setReturn(false);
    }
  }, [location, setReturn]);

  const handleReturn = () => {
    history.push("/");
  };
  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        {showReturn ? (
          <IconButton className={classes.icon} onClick={handleReturn}>
            <ArrowBack />
          </IconButton>
        ) : null}

        <Typography variant="h6" className={classes.title}>
          FE Academy
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
}
