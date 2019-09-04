import React, { useState, useEffect, FormEvent, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './content.scss';
import { any } from 'prop-types';
import { request } from 'http';
import { Message } from './customerType'
import MessageComponent from './MessageComponent'
declare var chrome: any;
let addedEvent = false

const APPID = 'bngjmejlpedjfeolhbjmeippdpaldlaf'





const Main: React.FC = () => {
  let port: any = null
  const [fold, toggleFold] = useState(false)
  const [comment, writeComment] = useState('')


  function deleteNote(message: Message) {
    let updateArrayMessage = notes.filter(note => {
      return note.timestamp !== message.timestamp
    })
    setNotes(updateArrayMessage)
    if (port) {
      port.postMessage({
        message: {
          type: 'delete_note',
          data: null
        }
      });
    }
  }


  function addComment(message: Message) {
    let updateArrayMessage = notes.map(note => {
      if (note.timestamp === message.timestamp) {
        return message
      } else {
        return note
      }
    })
    setNotes(updateArrayMessage)
    if (port) {
      port.postMessage({
        message: {
          type: 'add_comment',
          data: null
        }
      });
    }
  }


  const [notes, setNotes] = useState<Array<Message>>([])
  useEffect(() => {
    if (!addedEvent) {
      port = chrome.runtime.connect({ name: "takenotes" });
      port.postMessage({
        message: {
          type: 'get_notes',
          data: null
        }
      });
      port.onMessage.addListener((request: any) => {
        let message = request.message
        console.log(message)
        switch (message.type) {
          case "toggle":
            toggle();
            break;
          case "get_notes":
            setNotes(message.data)
            break;
          case "highlight_text":
            let note = doHighLight();
            if (note.content) {
              port.postMessage({
                message: {
                  type: 'take_notes',
                  data: note
                }
              })
              setNotes(notes => ([note, ...notes]))
            }
            break;
          default:
            break;
        }

      })

      addedEvent = true
    }



  })





  return (
    <div className={'take-notes-for-chrome-extension-by-byeage'}>
      <h3 className="product-name">Take Notes</h3>
      <ul className="list-notes">
        {notes.map((message: Message, i: number) => (
          <MessageComponent message={message}
            addComment={addComment}
            deleteNote={deleteNote}
            key={i} />
        ))}
      </ul>
    </div>
  )

}



const app = document.createElement('div');
app.id = "take-notes-for-chrome-extension-by-byeage";
ReactDOM.render(<Main />, app);
document.body.appendChild(app);
app.style.display = "none";

function toggle() {
  if (app.style.display === "none") {
    app.style.display = "block";
  } else {
    app.style.display = "none";
  }
}

function highLight(nodeList: Array<any>, r: Range) {
  nodeList.forEach(n => {
    if (n.nodeType === 3) {
      if (r.intersectsNode(n)) {
        if (n === r.startContainer || n === r.endContainer) {
          let wrapper = document.createElement("span")
          wrapper.setAttribute("class", "note-for-chrome-extension-by-byeage")
          let range = document.createRange()
          let s = n === r.startContainer ? r.startOffset : 0
          let e = n === r.endContainer ? r.endOffset : (n.nodeValue ? n.nodeValue.length : 0)
          range.setStart(n, s)
          range.setEnd(n, e)
          range.surroundContents(wrapper)
          range.detach()
          console.log(n)
          console.log(createXPathFromElement(n.parentNode))
          if (window.getSelection && window.getSelection()) {
            let s = window.getSelection()
            if (s) {
              s.removeAllRanges()
            }
          }
        } else {
          if (n.parentNode && n.parentNode.className.match("/note-for-chrome-extension-by-byeage/g")) {
            return
          }
          let wrapper = document.createElement("span")
          wrapper.setAttribute("class", "note-for-chrome-extension-by-byeage")
          let range = document.createRange()
          range.selectNode(n)
          range.surroundContents(wrapper)
          range.detach()
          console.log(createXPathFromElement(n.parentNode))
        }
      }

    } else {
      // console.log(r.startOffset, r.endOffset)
      if (n.childNodes.length > 0) {
        let nodeList = Array.from(n.childNodes)
        console.log(nodeList)
        highLight(nodeList, r)
      }

    }
  })
}



/**
 * 高亮标注
 */
function doHighLight(): Message {
  let s = window.getSelection()
  let str = ''
  if (s && s.toString().length) {
    str = s.toString()
    let r = s.getRangeAt(0)
    if (r.commonAncestorContainer.nodeType === 3) {
      let wrapper = document.createElement("span")
      wrapper.setAttribute("class", "note-for-chrome-extension-by-byeage")
      let range = document.createRange()
      // console.log(r.startOffset, r.endOffset)
      range.setStart(r.startContainer, r.startOffset)
      range.setEnd(r.endContainer, r.endOffset)
      range.surroundContents(wrapper)
      // console.log(r)
      // console.log(createXPathFromElement(r.commonAncestorContainer.parentNode))
    }
    let nodeList = Array.from(r.commonAncestorContainer.childNodes)
    highLight(nodeList, r)
  }
  let message: Message = {
    content: str,
    createAt: (new Date()).toString(),
    timestamp: Date.now(),
    url: window.location.href,
    title: document.title,
    site: window.location.hostname,
    comment: ''
  }
  return message
}





/**
 * 
 * @param elm 查找Xpath
 */
function createXPathFromElement(elm: any): any {
  var allNodes = document.getElementsByTagName('*');
  for (var segs = []; elm && elm.nodeType === 1; elm = elm.parentNode) {
    if (elm.hasAttribute('id')) {
      var uniqueIdCount = 0;
      for (var n = 0; n < allNodes.length; n++) {
        if (allNodes[n].hasAttribute('id') && allNodes[n].id === elm.id) uniqueIdCount++;
        if (uniqueIdCount > 1) break;
      };
      if (uniqueIdCount === 1) {
        segs.unshift('id("' + elm.getAttribute('id') + '")');
        return segs.join('/');
      } else {
        segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
      }
    } else if (elm.hasAttribute('class')) {
      segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
    } else {
      for (var i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
        if (sib.localName === elm.localName) i++;
      };
      segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
    };
  };
  return segs.length ? '/' + segs.join('/') : null;
};

/**
 * 根据xpath 找元素
 * @param path g
 */

function lookupElementByXPath(path: any): any {
  var evaluator = new XPathEvaluator();
  var result = evaluator.evaluate(path, document.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return result.singleNodeValue;
} 