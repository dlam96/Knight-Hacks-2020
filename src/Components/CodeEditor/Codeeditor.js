import React, { useState, useEffect } from "react";

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
  Chip,
  TextField,
} from "@material-ui/core";
import { PlayCircleFilled, HighlightOff } from "@material-ui/icons";
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
    height: "50vh",
  },
  codeMirrorPanel: {
    height: "40vh",
    backgroundColor: "black",
  },
  console: {
    // backgroundColor: "black",
    height: "inherit",
    width: "100%",
    overflow: "auto",
  },
  consoleResize: {
    color: "white",
    // borderRadius: "3px",
    padding: theme.spacing(1),
  },
  runBtn: {
    color: "white",
    backgroundColor: "green",
    margin: theme.spacing(1, 1, 0, 1),
  },
  clearBtn: {
    color: "white",
    backgroundColor: "red",
    margin: theme.spacing(1, 1, 0, 1),
  },
  buttonPanel: {
    paddingBottom: 7,
    borderBottom: "1px solid grey",
  },
}));

export default function Codeeditor(props) {
  const classes = useStyles();
  let [value, setValue] = useState("");
  let [output, setOutput] = useState("");
  let options = {
    mode: "javascript",
    json: "true",
    // theme: "",
    lineNumbers: true,
    theme: "material",
  };
  useEffect(() => {
    console.log("Output eeffect", output);
  }, [output]);
  const handleRun = async () => {
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
    await axios
      .post("http://165.22.38.77:3001/code", { input: value })
      .then((res) => {
        console.log("response", res);
        // var outputStr = res.data.output.split("\n").join("<br/>");
        setOutput(res.data.output);
        // console.log("Output", outputStr);
      })
      .catch((error) => {
        console.log("Get Error:", error);
      });
  };
  const handleClear = () => {
    setOutput("");
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
            <Grid className={classes.buttonPanel} direction="row">
              <Chip
                onClick={handleRun}
                label="Run Code"
                className={classes.runBtn}
                icon={<PlayCircleFilled style={{ color: "white" }} />}
                clickable
              />
              <Chip
                onClick={handleClear}
                label="Clear Console"
                className={classes.clearBtn}
                icon={<HighlightOff style={{ color: "white" }} />}
                clickable
              />
            </Grid>
            <Grid>
              <TextField
                value={output !== "" ? output : "Compile to see results..."}
                multiline
                rows={10}
                disabled
                className={classes.console}
                InputProps={{ classes: { disabled: classes.consoleResize } }}
              />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
