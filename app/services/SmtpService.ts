import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import portFinderSync from "portfinder-sync";
import { inject, injectable } from "inversify";
import DatabaseTables from "@app/constants/DatabaseTables";
import ConfigService from "varie/lib/config/ConfigService";
import DatabaseManager from "@app/services/DatabaseManager";
import { format } from 'date-fns'
@injectable()
export default class SmtpService {
  protected smtpConfig;
  protected configService;
  protected db;
  protected stateService;

  constructor(
    @inject("ConfigService") configService: ConfigService,
    @inject("DatabaseManager") databaseManager: DatabaseManager,
    @inject("StateService") stateService,
  ) {
    this.configService = configService;
    this.db = databaseManager;
    this.stateService = stateService;

    this.smtpConfig = {
      secure: false,
      authOptional: false,
      disabledCommands: ["STARTTLS"],
      onData: (stream, session, callback) => {
        this.receivedEmail(stream, session, callback);
      },
      onAuth: (auth, session, callback) => {
        if (auth.username.length === 0) {
          return callback(new Error("Invalid username or password"));
        }
        this.db.table(DatabaseTables.MailBoxes).find(
          {
            selector: {
              _id: auth.username,
            },
            limit: 1,
          },
          (error, { docs }) => {
            if (error) {
              return callback(new Error("We had a system error"));
            }
            let mailbox = docs[0];

            if (!mailbox) {
              return callback(new Error("Invalid username or password"));
            }

            // TODO - haven't implemented password
            // if (mailbox.password !== auth.password) {
            //   return callback(new Error("Invalid username or password"));
            // }

            return callback(null, { user: mailbox });
          },
        );
      },
    };
  }

  public start() {
    let port = portFinderSync.getPort(this.configService.get("smtp.port"));

    new SMTPServer(this.smtpConfig).listen(port);
  }

  public receivedEmail(stream, session, callback) {
    simpleParser(stream, (err, message) => {
      if (err) {
        console.error(`Error: ${err}`);
        callback(`Error: ${err}`);
      }

      message.mailboxId = session.user._id;
      message.date = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

      this.db
        .table(DatabaseTables.MailBoxMessages)
        .post(message)
        .then((result) => {
          message.id = result._id;
          this.stateService.store.commit("mailbox/message/ADD", message);
        });

      callback();
    });
  }
}
