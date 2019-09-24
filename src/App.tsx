import React from "react";
import moment from "moment";
import logo from "./logo.svg";
import "./App.scss";
import { addMessage, getAllMessage, putRecord, getRecord } from "./dbHandler";
import { Message, Record } from "./db";
// @ts-ignore
import unique from "unique-selector";

const App: React.FC = () => {
  const [messages, doAddMessage] = React.useState<Array<Message>>([]);
  

  const add = async () => {
    const message: Message = {
      uri: window.location.href,
      site: window.location.host,
      createAt: moment().format("YYYY-MM-DD HH:mm"),
      timestamp: Date.now(),
      content: "xxxx" + moment().format("YYYY-MM-DD HH:mm:ss"),
      title: document.title,
      markType: "background",
      markColor: "#f00",
      comment: ""
    };

    let res = await addMessage(message);
    console.log("res,", res);
    const m = {
      id: res,
      ...message
    };
    doAddMessage(
      (preState: Array<Message>): Array<Message> => {
        return [m, ...preState];
      }
    );
  };
  
  const record  = async () => {
    const record: Record = {
      hook: 'body',
      content: 'xxxxx',
      uri: window.location.href
    }
    putRecord(record)
      .then(res => {
        console.log(res)
      })
  }
  const params = {
    page: 2,
    limit: 10
  };
  // init
  React.useEffect(() => {
    getAllMessage(params.page, params.limit).then(res => {
      console.log(res)
      doAddMessage(
        (preState: Array<Message>): Array<Message> => {
          return [...res, ...preState];
        }
      );
    });


    getRecord(window.location.href)
      .then(res => {
        console.log('uri', res)
      })
  }, []);


  

  return (
    <div className="App">
      <ul>
        {messages.map((message: Message, index: number) => (
          <li key={index}>{message.content}</li>
        ))}
      </ul>
      <button onClick={add}>AddMessage</button>
      <button onClick={record}>AddRecord</button>
    </div>
  );
};

export default App;
