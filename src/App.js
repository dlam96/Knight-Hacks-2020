import React from 'react';
import './App.css';
import Collection from './TopicCollection/Collection';
import Button from '@material-ui/core/Button';


// jshint ignore : start
export default function App()
{
  const [isTopic, setFlag] = React.useState(false);

  return (
    <div>
      <div style={{backgroundColor: "#D1D1D1", width: "1366px", height: "78px"}}>
        {/* set flag based on topic and test */}
        <div style={{paddingTop: "2%", paddingLeft: "2%"}}>
          <span><Button onClick={() => setFlag(true)}>By Topic</Button></span>
          &nbsp;
          <span className="vl"></span>
          &nbsp;
          <span><Button onClick={()=> setFlag(false)}>By Test</Button></span>
        </div>
      </div>

      <Collection id={1} isTopic={isTopic} term={"Spring 2020"}/>
      <Collection id={2} isTopic={isTopic} term={"Fall 2019"}/>
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