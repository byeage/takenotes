import { db, Record, Message } from "./db";
import { async } from "q";


const _getMessageCount = async () => {
  const res = db.messages.count();
  return res;
};

export const putRecord = async (record: Record) => {
  const res = await db.records.put(record);
  return res;
};

export const getRecord = async (uri: string) => {
  const res = await db.records.get(uri);
  return res;
};

export const addMessage = async (message: Message) => {
  const res = await db.messages.add(message);
  return res;
};

export const commentMessage = async (message: Message) => {
  const res = await db.messages.put(message);
  return res;
};

export const deleteMessage = async (id: number) => {
  const res = await db.messages.delete(id);
  return res;
};

export const getAllMessage = async (page: number, limit: number) => {
  const res = await db.messages
    .offset((page - 1) * limit)
    .limit(limit)
    .sortBy('timestamp')
    
  return res.reverse();
};

export const getMessagesByUri = async (
  page: number,
  limit: number,
  uri: string
) => {
  const res = await db.messages
    .where("uri")
    .equals(uri)
    .offset((page - 1) * limit)
    .limit(limit)
    .sortBy('timestamp')
    
    
  return res.reverse();
};

export const getMessageBySite = async (
  page: number,
  limit: number,
  site: string
) => {
  const res = await db.messages
    .where("site")
    .equals("site")
    .offset((page - 1) * limit)
    .limit(limit)
    .sortBy('timestamp')
  return res;
};
