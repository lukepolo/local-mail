import nodemailer from "nodemailer";
import { SMTPServer } from "smtp-server";
import { simpleParser } from "mailparser";
import portFinderSync from "portfinder-sync";
import { inject, injectable } from "inversify";
import DatabaseTables from "@app/constants/DatabaseTables";
import ConfigService from "varie/lib/config/ConfigService";
import DatabaseManager from "@app/services/DatabaseManager";
// @ts-ignore
import welcome from "./../../test/test-emails/welcome.txt";
import { format } from "date-fns";
import DateFormats from "@app/constants/DateFormats";
@injectable()
export default class SmtpService {
  protected db;
  protected port;
  protected smtpConfig;
  protected stateService;

  constructor(
    @inject("ConfigService") configService: ConfigService,
    @inject("DatabaseManager") databaseManager: DatabaseManager,
    @inject("StateService") stateService,
  ) {
    this.db = databaseManager;
    this.stateService = stateService;
    this.port = configService.get("smtp.port", 465);

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
        this.db
          .table(DatabaseTables.MailBoxes)
          .find({
            selector: {
              _id: auth.username,
            },
            limit: 1,
          })
          .then(({ docs }) => {
            let mailbox = docs[0];

            if (!mailbox) {
              return callback(new Error("Invalid username or password"));
            }
            // TODO - haven't implemented password
            // if (mailbox.password !== auth.password) {
            //   return callback(new Error("Invalid username or password"));
            // }

            return callback(null, { user: mailbox });
          });
      },
    };
  }

  public sendTestToMailbox(mailboxId) {
    return this.db
      .table(DatabaseTables.MailBoxes)
      .find({
        selector: {
          _id: mailboxId,
        },
        limit: 1,
      })
      .then(({ docs }) => {
        let mailbox = docs[0];

        if (!mailbox) {
          throw new Error("Invalid mailbox");
        }

        let smtpTransport = nodemailer.createTransport({
          host: "localhost",
          port: this.port,
          secure: false,
          tls: {
            rejectUnauthorized: false,
          },
          auth: {
            user: mailbox._id,
            pass: mailbox._id,
          },
        });

        return smtpTransport
          .sendMail({
            envelope: {
              to: ["hi@local-mail.local"],
              from: `"test" <testing.smtp@local-mail.local>`,
            },
            raw: welcome,
          })
          .then(
            (info) => {
              smtpTransport.close();
              return info;
            },
            () => {
              smtpTransport.close();
              throw new Error("Failed to send.");
            },
          );
      });
  }

  public getRunningPort() {
    return this.port;
  }

  public start() {
    this.port = portFinderSync.getPort(this.port);

    console.debug("SMTP Listening on", this.port);
    new SMTPServer(this.smtpConfig).listen(this.port);
  }

  public receivedEmail(stream, session, callback) {
    simpleParser(stream, (err, message) => {
      if (err) {
        console.error(`Error: ${err}`);
        callback(`Error: ${err}`);
      }

      message.mailboxId = session.user._id;
      message.date = format(new Date(), DateFormats.ISO8601);

      console.info("MESSAGE RECEIVED", message);
      this.db
        .table(DatabaseTables.MailBoxMessages)
        .post(message)
        .then((result) => {
          message._id = result.id;
          this.stateService.store.commit("mailbox/message/ADD", message);
        });

      callback();
    });
  }
}
