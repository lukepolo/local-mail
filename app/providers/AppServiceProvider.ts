import { ServiceProvider } from "varie";
import SmtpService from "@app/services/SmtpService";
import PouchDb from "@app/services/databses/PouchDb";
import MailBoxService from "@app/services/MailBoxService";
import DatabaseManager from "@app/services/DatabaseManager";
import MailBoxMessageService from "@app/services/MailBoxMessageService";

/*
|--------------------------------------------------------------------------
| App Service Provider
|--------------------------------------------------------------------------
| You can bind various items to the app here, or can create other
| custom providers that bind the container
|
*/
export default class AppProviderServiceProvider extends ServiceProvider {
  public async boot() {
    this.app.make<SmtpService>("SmtpService").start();
    this.app.make<DatabaseManager>("DatabaseManager").connect();
  }

  public async register() {
    this.app.bind("PouchDb", PouchDb);
    this.app.bind("SmtpService", SmtpService);
    this.app.bind("MailBoxService", MailBoxService);
    this.app.bind("DatabaseManager", DatabaseManager);
    this.app.bind("MailBoxMessageService", MailBoxMessageService);
  }
}
