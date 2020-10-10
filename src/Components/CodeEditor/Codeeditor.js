import React, { useState } from "react";

// import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./CodeMirror.css";
import {
  Grid,
  Container,
  makeStyles,
  CssBaseline,
  Paper,
  Button,
} from "@material-ui/core";
const axios = require("axios");
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");

const useStyles = makeStyles((theme) => ({
  container: {
    // flexGrow: 1,
    // width: "100%",
    height: "90vh",
  },
  codeMirror: {
    height: "80vh",
  },
  codeMirrorPanel: {
    height: "10vh",
  },
}));

export default function Codeeditor(props) {
  const classes = useStyles();
  let [value, setValue] = useState("");
  let options = {
    mode: "javascript",
    json: "true",
    // theme: "",
    lineNumbers: true,
    theme: "material",
  };
  const handleClick = () => {
    String.prototype.escapeSpecialChars = function () {
      return this.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
    };
    value = value.escapeSpecialChars();
    console.log("Before:", value);

    var json_string = JSON.stringify(value);

    console.log("Hmm:", json_string);
    axios
      .post("http://165.22.38.77:3001/code", { input: value })
      .then((res) => {
        console.log("response", res);
      })
      .catch((error) => {
        console.log("Get Error:", error);
      });
  };

  return (
    <Container maxWidth={false} disableGutters={true}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} md={5} lg={5}>
          <Paper className={classes.container}>test</Paper>
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <CodeMirror
            value={value}
            options={options}
            onBeforeChange={(editor, data, value) => {
              setValue(value);
            }}
            onChange={(editor, data, value) => {
              console.log("OnChange", value);
            }}
            className={classes.codeMirror}
          />
          <Paper className={classes.codeMirrorPanel}>
            <Button onClick={handleClick}>Run</Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
