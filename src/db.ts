import Dexie from "dexie";

export type Message = {
  content: string; // 标注内容
  createAt: string; //标注创建时间
  timestamp: number; // 标注时间点
  uri: string; // 网页地址
  site: string; //  网页站点
  title: string; // 网页标题
  comment: string; // 标注内容评论
  markColor: string; // 标注颜色
  markType: string; // 标注类型
};

export type Record = {
  content: string; // html content
  hook: string; // 最外层的节点， 内容放在hook节点里面
  uri: string; // 页面URI
};

export type NoteMessage = {
  message: Message;
  record: Record;
};

class ChromeExtensionWebMarker extends Dexie {
  public records: Dexie.Table<Record, string>;
  public messages: Dexie.Table<Message, number>;
  public constructor() {
    super("ChromeExtensionWebMarker");
    this.version(1).stores({
      records: "&uri,hook,content",
      messages:
        "++id,content,createAt,timestamp,uri, site, title, comment, markColor, markType"
    });

    this.records = this.table("records");
    this.messages = this.table("messages");
  }
}

export const db = new ChromeExtensionWebMarker();

// db.transaction('rw', db.friends, async() => {

//     // Make sure we have something in DB:
//     if ((await db.friends.where({name: 'Josephine'}).count()) === 0) {
//         const id = await db.friends.add({name: "Josephine", age: 21});
//         alert (`Addded friend with id ${id}`);
//     }

//     // Query:
//     const youngFriends = await db.friends.where("age").below(25).toArray();

//     // Show result:
//     alert ("My young friends: " + JSON.stringify(youngFriends));

// }).catch(e => {
//     alert(e.stack || e);
// });
