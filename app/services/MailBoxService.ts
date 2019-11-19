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
      .then((results) => {
        return results.rows.map(({ doc }) => {
          return {
            id: doc._id,
            name: doc.name,
          };
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
          return {
            id: docs[0]._id,
            name: docs[0].name,
          };
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
              id: result._id,
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
