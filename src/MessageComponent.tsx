import React, { useState, useEffect, FormEvent, Fragment, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Message } from './customerType'


function fullFormat(num: number, limit: number = 10): string {
  return num < limit ? '0' + num : num.toString()
}

function formatDate(timeStr: string, separator: string = '-') {
  const date = new Date(timeStr)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minutes = date.getMinutes()

  return [year, fullFormat(month), fullFormat(day)].join(separator) + ' ' + `${fullFormat(hour)}:${fullFormat(minutes)}`
}

function handleSubmit(event: FormEvent) {
  event.preventDefault()
}

type IProps = {
  message: Message
  addComment: (message: Message) => void,
  deleteNote: (message: Message) => void
}

const MessageComponent: React.FC<IProps> = (props) => {

  const message = props.message
  const [fold, toggleFold] = useState(false)
  const [comment, writeComment] = useState(message.comment)



  function deleteNote(): void {
    props.deleteNote(message)
  }

  function makeComment(): void {
    let updateMessage = {
      ...message,
      comment
    }
    props.addComment(updateMessage)
    toggleFold(!fold)
  }

  let buttonName = 'Comment'
  if (message.comment) {
    buttonName = 'Update Comment'
  }

  return (<li>
    <div className="delete">
      <button onClick={deleteNote}>&times;</button>
    </div>
    <section>
      <p>Source Content:</p>
      <pre className="message-source">
        {message.content}
      </pre>
    </section>


    {message.comment && (
      <section>
        <p>Comment:</p>
        <pre className="message-comment">
          {message.comment}
        </pre>
      </section>

    )}

    <section>
      <div className="title">
        <a href={message.url}>
          <h5>{message.title}</h5>
        </a>
      </div>
      <div className="extra">
        <div className="create-at">
          <span>Created At:</span>
          <time>{formatDate(message.createAt)}</time>
        </div>

        <div className="site">
          <a href={message.site}>
            <span>Site:</span>
            <img src={`//s2.googleusercontent.com/s2/favicons?domain_url=${message.site}`} alt="favicon" />
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="comment">
          {fold && (
            <Fragment>
              <textarea name="col" value={comment} onChange={e => writeComment(e.target.value)} ></textarea>
              <button className="submit" onClick={makeComment}>Submit</button>
            </Fragment>
          )}
          <button className={`comment ${fold ? 'cancle' : ''}`}
            onClick={() => toggleFold(!fold)}>
            {!fold ? buttonName : 'Cancle'}
          </button>
        </div>
      </form>
    </section>




  </li>)

}


export default MessageComponent