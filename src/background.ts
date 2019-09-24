// // Called when the user clicks on the browser action
// /* global chrome:true */
// console.log('backgroud ready')
import { db } from './db'
import { any } from 'prop-types'

if (!window.indexedDB) {
  console.log(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  )
} else {
    console.log(  "Your browser  support IndexedDB.")
}

const APPID = 'bngjmejlpedjfeolhbjmeippdpaldlaf'
let activePort:any = null

// // chrome.tabs.onActivated.addListener(tab => {})

// chrome.browserAction.onClicked.addListener(function(tab) {
//   sendMessageToActiveTab({
//     type: 'toggle',
//     data: ''
//   })
// })

// function sendMessageToTargetTab(tabId, message) {
//   chrome.tabs.sendMessage(tabId, {
//     message: message
//   })
// }

// function sendMessageToActiveTab(message) {
//   // Send a message to the active tab

//   return new Promise(resolve => {
//     if (activePort) {
//       return activePort.postMessage({
//         message: message
//       })
//     } else {
//       console.error('port ....')
//     }
//   })
// }

// chrome.runtime.onConnect.addListener(function(port) {
//   activePort = port
//   port.onMessage.addListener(function(res) {
//     let message = res.message
//     switch (message.type) {
//       case 'get_notes':
//         // getNoteList().then(res => {
//         //   port.postMessage({
//         //     message: {
//         //       type: 'get_notes',
//         //       data: res
//         //     }
//         //   })
//         // })

//         break

//       case 'get_record':
//         // getRecordInfo(message.data.uri).then(res => {
//         //   port.postMessage({
//         //     message: {
//         //       type: 'get_record',
//         //       data: res
//         //     }
//         //   })
//         // })
//         break

//       case 'take_notes':
//         // let store = getObjectStore(storeName, 'readwrite')
//         // let recordStore = getObjectStore(pageStoreName, 'readwrite')

//         // try {
//         //   store.add(message.data.message)
//         //   recordStore.put(message.data.record)
//         //   console.log(message.data.record)
//         // } catch (error) {
//         //   throw error
//         // }
//         break

//       case 'add_comment':
//         console.log('add comment')
//         break
//       default:
//         break
//     }

//     return true // Inform Chrome that we will make a delayed sendResponse
//   })
// })

// /**
//  * 快捷键
//  */
// chrome.commands.onCommand.addListener(function(command) {
//   console.log('Command:', command)

//   switch (command) {
//     case 'get_note_list':
//     //   getNoteList().then(list => {
//     //     sendMessageToActiveTab({
//     //       type: 'get_note_list',
//     //       data: list
//     //     })
//     //   })
//       break
//     case 'highlight_text':
//       sendMessageToActiveTab({
//         type: 'highlight_text',
//         data: ''
//       })
//       break
//     default:
//       break
//   }
// })
