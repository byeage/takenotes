import React from 'react';
import logo from './logo.svg';
import './App.scss';

const App: React.FC = () => {

  function doHighLight() {

    let s = window.getSelection()
    if (s && s.toString().length) {
      let r = s.getRangeAt(0)
      if (r.commonAncestorContainer.nodeType === 3) {
        let wrapper = document.createElement("span")
        wrapper.setAttribute("class", "maker")
        let range = document.createRange()
        console.log(r.startOffset, r.endOffset)
        range.setStart(r.startContainer, r.startOffset)
        range.setEnd(r.endContainer, r.endOffset)
        range.surroundContents(wrapper)

      }
      let nodeList = Array.from(r.commonAncestorContainer.childNodes)
    }
  }


  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>2i</th>
            <th>2i</th>
            <th>3i</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
      <p>22222jdhasdadhkadkajh    <span><em>22asa</em></span>   dkhasdadasa</p>
      <div>adasdakjdajdhakdad<span id="note" className="note">adasdadasdasdada</span>sxxxxakjdkeaodakhda</div>

      <button className="check-func" onClick={doHighLight} >Check</button>
    </div>
  );
}

export default App;
