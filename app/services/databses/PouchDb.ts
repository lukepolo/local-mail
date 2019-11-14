import fs from "fs";
import pouchDb from "pouchdb";
import pouchdbFind from "pouchdb-find";
import { inject, injectable } from "inversify";
import ConfigInterface from "varie/lib/config/ConfigInterface";

@injectable()
export default class PouchDb {
  protected database;
  protected configService;

  constructor(@inject("ConfigService") configService: ConfigInterface) {
    this.configService = configService;

    let databaseDirectory = this.configService.get(
      `database.drivers.PouchDb.path`,
    );

    if (!fs.existsSync(databaseDirectory)) {
      fs.mkdirSync(databaseDirectory);
    }

    this.database = pouchDb.defaults({
      prefix: `${databaseDirectory}/`,
    });

    this.database.plugin(pouchdbFind);
  }

  public connect() {
    return this;
  }

  public table(table) {
    return new this.database(table);
  }
}
