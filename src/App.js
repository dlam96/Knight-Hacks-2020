import React from 'react';
import Collection from './TopicCollection/Collection';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
  vl: {
    borderLeft: '1px solid black',
    height: '30px',
  },


  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
    padding: "10px",
  },
}));

// jshint ignore : start
export default function App()
{
  // isTopic will act as the global flag for
  // deciding whether we show information
  // by topic or by test date
  const [isTopic, setFlag] = React.useState(false);
  const classes = useStyles();

  function SetTrue(e)
  {
    e.preventDefault();
    setFlag(true);
  }

  function SetFalse(e)
  {
    e.preventDefault();
    setFlag(false);
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ backgroundColor: "#D1D1D1", height: "78px" }}
      >
        <Grid container alignItems="center" className={classes.root}>
          <Link href="/" onClick={SetTrue}>By Topic</Link>
          <Divider orientation="vertical" flexItem />
          <Link href="/" onClick={SetFalse}>By Test</Link>
        </Grid>
      </Grid>

      <Collection id={1} isTopic={isTopic} term={"Spring 2020"} />
      <Collection id={2} isTopic={isTopic} term={"Fall 2019"} />
    </div>
  );
}




// String.prototype.escapeSpecialChars = function ()
//   {
//     return this.replace(/\\n/g, "\\n")
//       .replace(/\\'/g, "\\'")
//       .replace(/\\"/g, '\\"')
//       .replace(/\\&/g, "\\&")
//       .replace(/\\r/g, "\\r")
//       .replace(/\\t/g, "\\t")
//       .replace(/\\b/g, "\\b")
//       .replace(/\\f/g, "\\f");
//   };

//   let string =
//     `
// #include <stdio.h>
// #include <stdlib.h>

// int main(void){
//   int num = 5;
//   int num2 = 6;
//   int i;
//   printf("product = %d", num * num2);
//     return 0;
// }
// `

//   string = string.escapeSpecialChars();
//   console.log("Before:", string)


//   var json_string = JSON.stringify(string);

//   console.log("JSON:", json_string);