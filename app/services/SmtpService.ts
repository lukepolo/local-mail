import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import portFinderSync from "portfinder-sync";
import { inject, injectable } from "inversify";
import DatabaseTables from "@app/constants/DatabaseTables";
import ConfigService from "varie/lib/config/ConfigService";
import DatabaseManager from "@app/services/DatabaseManager";

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

  private parseClient(session) {
    return `${
      session.clientHostname === `[${session.remoteAddress}]`
        ? session.remoteAddress
        : `${session.clientHostname} ${session.remoteAddress}`
    }`;
  }

  public receivedEmail(stream, session, callback) {
    console.info(`received message from ${this.parseClient(session)}`);
    let recipients = [];
    let fromAddress = session.envelope.mailFrom.address;

    session.envelope.rcptTo.forEach((recipient) => {
      recipients.push(recipient.address);
    });

    simpleParser(stream, (err, message) => {
      if (err) {
        console.error(`Error: ${err}`);
        callback(`Error: ${err}`);
      }

      message.to = recipients.join(", ");
      message.from = fromAddress;

      message = Object.assign(message, {
        mailboxId: session.user._id,
      });

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
