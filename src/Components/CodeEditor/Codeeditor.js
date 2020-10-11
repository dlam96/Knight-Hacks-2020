import React, { useState, useEffect } from "react";
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
  Typography,
} from "@material-ui/core";
import { PlayCircleFilled, HighlightOff, RotateLeft } from "@material-ui/icons";
const axios = require("axios");
require("codemirror/mode/xml/xml");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/clike/clike");

const useStyles = makeStyles((theme) => ({
  container: {
    // flexGrow: 1,
    width: "100%",
    // height: "100vh",
  },
  codeMirror: {
    height: "100%",
    // height: "45vh",
    width: "100%",
  },
  codeMirrorGrid: {
    height: "91vh",
  },
  codeMirrorPanel: {
    // height: "45vh",
    height: "100%",
    // justifySelf: "flex-end",
    backgroundColor: "black",
  },
  codeMirrorPanelGrid: {
    height: "50%",
  },
  console: {
    // backgroundColor: "black",
    height: "35vh",
    width: "100%",
    // overflow: "auto",
  },
  summary: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(0, 0, 0, 3),
  },
  summaryResize: {
    height: "100%",
  },
  timeConsoleHeight: {
    // height: "10%",
    width: "100%",
    padding: theme.spacing(0, 0, 0, 2),
  },
  timeConsole: {
    color: "green",
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
    "&:hover": {
      backgroundColor: "darkgreen",
    },
    "&:focus": {
      outline: "none",
      backgroundColor: "green",
    },
  },
  clearBtn: {
    color: "white",
    backgroundColor: "red",
    margin: theme.spacing(1, 1, 0, 1),
    "&:hover": {
      backgroundColor: "#8B0000",
    },
    "&:focus": {
      outline: "none",
      backgroundColor: "red",
    },
  },
  resetBtn: {
    color: "white",
    backgroundColor: "grey",
    margin: theme.spacing(1, 1, 0, 1),
    "&:hover": {
      backgroundColor: "darkgrey",
    },
    "&:focus": {
      outline: "none",
      backgroundColor: "grey",
    },
  },
  buttonPanel: {
    paddingBottom: 7,
    borderBottom: "1px solid grey",
  },
  outputStatus: {
    // padding: theme.spacing(3, 1, 0, 1),
    justifyContent: "center",
    color: "white",
    align: "right",
  },
  paper: {
    height: "45vh",
  },
  subpaper: {
    backgroundColor: "#D1D1D1",
    padding: theme.spacing(2),
  },
  heading: {
    padding: theme.spacing(3),
  },
}));

export default function Codeeditor(props) {
  const classes = useStyles();
  let [value, setValue] = useState("");
  let [originalVal, setOriVal] = useState("");
  let [output, setOutput] = useState("");
  let [timeTook, setTime] = useState("");
  let [probName, setProbName] = useState("");
  let [probSummary, setProbSummary] = useState("");
  let [probTopic, setProbTopic] = useState("");
  let options = {
    mode: "text/x-csrc",
    lineNumbers: true,
    theme: "material",
    smartIndent: false,
    tabSize: 2,
  };
  // useEffect(() => {
  //   console.log("Output eeffect", output);
  // }, [output]);
  useEffect(() => {
    axios
      .get("http://165.22.38.77:3001/code")
      .then((res) => {
        console.log("Get response", res);
        setOriVal(res.data.problem);
        setValue(res.data.problem);
        setProbName(res.data.problem_name);
        setProbSummary(res.data.problem_summary);
        setProbTopic(res.data.problem_topic);
      })
      .catch((error) => {
        console.log("Get err", error);
      });
  }, []);

  const handleReset = () => {
    console.log("Resetting");
    setValue(originalVal);
  };
  const handleRun = async () => {
    setOutput("Compiling code...");
    setTime("");
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
    // let newValue = JSON.stringify(value);
    // console.log("Before:", newValue);

    await axios
      .post("http://165.22.38.77:3001/code", { input: value })
      .then((res) => {
        console.log("response", res);
        setOutput(res.data.output);
        setTime(res.data.time_taken);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setOutput(error.response.data.error);
          setTime("N/A");
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  const handleClear = () => {
    setOutput("");
    setTime("");
  };
  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      className={classes.container}
    >
      <CssBaseline />
      <Grid container>
        <Grid container item direction="column" xs={12} md={6} lg={6}>
          <Grid item>
            <Paper className={classes.paper}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.subpaper}
              >
                Topic 1 - {probTopic} from {probName}
              </Typography>
              {/* <Typography
                variant="body1"
                gutterBottom
                className={classes.heading}
              >
                {probSummary}
              </Typography> */}
              <TextField
                value={probSummary}
                multiline
                rows={12}
                // disabled
                className={classes.summary}
                InputProps={{
                  classes: { input: classes.summaryResize },
                  readOnly: true,
                  disableUnderline: true,
                }}
              />
            </Paper>
          </Grid>
          <Grid item className={classes.codeMirrorPanelGrid}>
            <Paper className={classes.codeMirrorPanel}>
              <Grid className={classes.buttonPanel}>
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
                <Chip
                  onClick={handleReset}
                  label="Reset Problem"
                  className={classes.resetBtn}
                  icon={<RotateLeft style={{ color: "white" }} />}
                  clickable
                />
                {/* <Typography
                className={classes.outputStatus}
                display="inline"
                align="right"
              >
                Output:
              </Typography> */}
              </Grid>
              <Grid>
                <TextField
                  value={output !== "" ? output : "Run code to see results..."}
                  multiline
                  rows={10}
                  disabled
                  className={classes.console}
                  InputProps={{
                    classes: { disabled: classes.consoleResize },
                  }}
                />
                <TextField
                  value={
                    timeTook !== ""
                      ? "Finished in " + parseFloat(timeTook).toFixed(2)
                      : ""
                  }
                  disabled
                  className={classes.timeConsoleHeight}
                  InputProps={{ classes: { disabled: classes.timeConsole } }}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} lg={6} direction="column">
          <Grid className={classes.codeMirrorGrid}>
            <CodeMirror
              value={value}
              options={options}
              onBeforeChange={(editor, data, value) => {
                setValue(value);
              }}
              onChange={(editor, data, value) => {
                // console.log("OnChange", value);
              }}
              className={classes.codeMirror}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
