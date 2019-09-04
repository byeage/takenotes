// Called when the user clicks on the browser action
/* global chrome:true */
console.log("backgroud ready");

if (!window.indexedDB) {
  console.log(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  );
}
const APPID = "bngjmejlpedjfeolhbjmeippdpaldlaf";
const dbName = "TakeNotesForChromeExtensionByAge";
const storeName = "notes";
const request = window.indexedDB.open(dbName, 3);
let db = null;
let activePort = null;

function getObjectStore(name, mode) {
  var tx = db.transaction(name, mode);
  return tx.objectStore(name);
}

request.onerror = event => {
  alert("Database error: " + event.target.errorCode);
};

request.onsuccess = function(event) {
  db = this.result;
  getNoteList().then(list => {
    console.log(list);
  });
};

chrome.tabs.onActivated.addListener(tab => {});

function getNoteList(site = null, timeStart = null, timeEnd = null) {
  return new Promise(resolve => {
    var store = getObjectStore(storeName, "readonly");
    var list = [];
    store.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        list.push(cursor.value);
        cursor.continue();
      } else {
        list.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
        resolve(list);
      }
    };
  });
}

request.onupgradeneeded = event => {
  let store = event.currentTarget.result.createObjectStore(storeName, {
    keyPath: "id",
    autoIncrement: true
  });

  store.createIndex("content", "content", { unique: false });
  store.createIndex("timestamp", "timestamp", { unique: true });
  store.createIndex("createAt", "createAt", { unique: false });
  store.createIndex("url", "url", { unique: false });
  store.createIndex("site", "site", { unique: false });
  store.createIndex("title", "title", { unique: false });
  store.createIndex("comment", "comment", { unique: false });
};

chrome.browserAction.onClicked.addListener(function(tab) {
  sendMessageToActiveTab({
    type: "toggle",
    data: ""
  });
});

function sendMessageToTargetTab(tabId, message) {
  chrome.tabs.sendMessage(tabId, {
    message: message
  });
}

function sendMessageToActiveTab(message) {
  // Send a message to the active tab

  return new Promise(resolve => {
    if (activePort) {
      return activePort.postMessage({
        message: message
      });
    } else {
      console.error("port ....");
    }
  });
}

chrome.runtime.onConnect.addListener(function(port) {
  console.log(port);
  activePort = port;
  port.onMessage.addListener(function(res) {
    console.log(res);
    let message = res.message;
    switch (message.type) {
      case "get_notes":
        getNoteList().then(res => {
          port.postMessage({
            message: {
              type: "get_notes",
              data: res
            }
          });
        });
        break;

      case "take_notes":
        let store = getObjectStore(storeName, "readwrite");
        try {
          store.add(message.data);
        } catch (error) {
          throw error;
        }
        break;

      case "add_comment":
        console.log("add comment");
        break;
      default:
        break;
    }

    return true; // Inform Chrome that we will make a delayed sendResponse
  });
});

/**
 * 快捷键
 */
chrome.commands.onCommand.addListener(function(command) {
  console.log("Command:", command);

  switch (command) {
    case "get_note_list":
      getNoteList().then(list => {
        sendMessageToActiveTab({
          type: "get_note_list",
          data: list
        });
      });
      break;
    case "highlight_text":
      sendMessageToActiveTab({
        type: "highlight_text",
        data: ""
      });
      break;
    default:
      break;
  }
});
