import { inject, injectable } from "inversify";
import DatabaseTables from "@app/constants/DatabaseTables";
import DatabaseManager from "@app/services/DatabaseManager";

@injectable()
export default class MailBoxMessageService {
  protected db;

  constructor(@inject("DatabaseManager") databaseManager: DatabaseManager) {
    this.db = databaseManager;
  }

  public get(mailboxId) {
    return this.db
      .table(DatabaseTables.MailBoxMessages)
      .find({
        selector: {
          mailboxId,
        },
      })
      .then(({ docs }) => {
        return docs;
      });
  }

  public show(mailboxId, messageId) {
    return this.db
      .table(DatabaseTables.MailBoxMessages)
      .find({
        selector: {
          mailboxId,
          _id : messageId,
        },
        limit : 1,
      })
      .then(({ docs }) => {
        return docs[0];
      });
  }
}
