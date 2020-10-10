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
import { PlayCircleFilled, HighlightOff } from "@material-ui/icons";
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
    height: "50%",
  },
  codeMirrorPanel: {
    // height: "45vh",
    height: "100%",

    backgroundColor: "black",
  },
  codeMirrorPanelGrid: {
    height: "50%",
  },
  console: {
    // backgroundColor: "black",
    height: "100%",
    width: "100%",
    overflow: "auto",
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
    height: "91vh",
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
  let [output, setOutput] = useState("");
  let [timeTook, setTime] = useState("");
  let options = {
    mode: "text/x-csrc",
    // json: "true",
    lineNumbers: true,
    theme: "material",
    smartIndent: false,
    tabSize: 2,
  };
  useEffect(() => {
    console.log("Output eeffect", output);
  }, [output]);
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
    console.log("Before:", value);

    await axios
      .post("http://165.22.38.77:3001/code", { input: value })
      .then((res) => {
        console.log("response", res);
        // var outputStr = res.data.output.split("\n").join("<br/>");
        setOutput(res.data.output);
        setTime(res.data.time_taken);
        // console.log("Output", outputStr);
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
        <Grid item xs={12} md={5} lg={5}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom className={classes.subpaper}>
              Topic 1 - Linked List
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              className={classes.heading}
            >
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus, cupiditate numquam dignissimos
              laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
          </Paper>
        </Grid>
        <Grid container item xs={12} md={7} lg={7} direction="column">
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
          <Grid className={classes.codeMirrorPanelGrid}>
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
                  InputProps={{ classes: { disabled: classes.consoleResize } }}
                />
                <TextField
                  value={timeTook !== "" ? "Finished in " + timeTook : ""}
                  disabled
                  className={classes.timeConsoleHeight}
                  InputProps={{ classes: { disabled: classes.timeConsole } }}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
