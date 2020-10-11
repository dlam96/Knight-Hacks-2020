import React from "react";
import Navbar from "./Components/Navbar/Navbar.js";
import Codeeditor from "./Components/CodeEditor/Codeeditor.js";
import CardMenu from "./Components/CardMenu/CardMenu.js";
import { makeStyles } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    // flexGrow: 1,
    // width: "100%",
    // height: "100vh",
    // display: "flex",
    // flexFlow: "column",
  },
}));
function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <CardMenu />
        </Route>
        <Route exact path="/CodeEditor">
          <Codeeditor />
        </Route>
      </Switch>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </div>
  );
}

export default App;
