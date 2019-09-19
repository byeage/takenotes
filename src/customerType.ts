import { Message } from './customerType';
export type Message = {
  content: string,
  createAt: string,
  timestamp: number,
  url: string,
  site: string,
  title: string,
  comment: string
}


export type Record = {
  content: string,
  hook: string,
  uri: string
}

export type NoteMessage = {
  message: Message,
  record: Record
}