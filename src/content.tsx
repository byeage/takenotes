import React from 'react';
import ReactDOM from 'react-dom';
import './content.css';
const  Main: React.FC = () => {

  
    return (
      <div className={'my-extension'}>
        <h1>Hello world - My first Extension</h1>
      </div>
    )
  
}



const app = document.createElement('div');
app.id = "my-extension-root";
ReactDOM.render(<Main />, app);
document.body.appendChild(app);
app.style.display = "none";
declare var chrome: any;
chrome.runtime.onMessage.addListener(
  function (request:any, sender:any, sendResponse: any) {
    if (request.message === "clicked_browser_action") {
      toggle();
    }
  }
);
function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}

