import { inject, injectable } from "inversify";
import DatabaseTables from "@app/constants/DatabaseTables";
import DatabaseManager from "@app/services/DatabaseManager";

@injectable()
export default class MailBoxService {
  protected db;

  constructor(@inject("DatabaseManager") databaseManager: DatabaseManager) {
    this.db = databaseManager;
  }

  public get() {
    return this.db
      .table(DatabaseTables.MailBoxes)
      .allDocs({
        include_docs: true,
        attachments: true,
      })
      .then(({ rows }) => {
        return rows.map((row) => {
          return row.doc;
        });
      });
  }

  public show(data) {
    return this.db
      .table(DatabaseTables.MailBoxes)
      .find({
        selector: data,
        limit: 1,
      })
      .then(({ docs }) => {
        if (docs[0]) {
          return docs[0];
        }
        return false;
      });
  }

  public create(name) {
    return this.show({
      name,
    }).then((result) => {
      if (!result) {
        return this.db
          .table(DatabaseTables.MailBoxes)
          .post({ name })
          .then((result) => {
            return {
              name,
              _id: result.id,
            };
          });
      }
      throw Error("Mailbox already exists.");
    });
  }

  public remove(mailbox) {
    return this.db.connection("mailboxes").remove(mailbox._id);
  }
}
