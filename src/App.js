import React from 'react';
import './App.css';
import TopicCollection from './TopicCollection/TopicCollection';



// jshint ignore : start
export default function App()
{

  return (
    <div>

      <div style={{backgroundColor: "#D1D1D1", width: "1366px", height: "78px"}}>
        {/* use react router on topic and test */}
        <div>
          <span>By Topic</span>
          &nbsp;
          <span className="vl"></span>
          &nbsp;
          <span>by Test</span>
        </div>
      </div>

      <TopicCollection/>
      <TopicCollection/>


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