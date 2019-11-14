import { inject, injectable } from "inversify";
import ConfigInterface from "varie/lib/config/ConfigInterface";

@injectable()
export default class DatabaseManager {
  protected app;
  protected configService;
  protected connections = {};

  constructor(
    @inject("app") app,
    @inject("ConfigService") configService: ConfigInterface,
  ) {
    this.configService = configService;
    this.app = app;
  }

  public connect(connection?) {
    this.connection(connection);
  }

  protected makeConnection(connection?) {
    connection =
      connection || this.configService.get("database.default_connection");
    let config = this.configService.get(`database.connections.${connection}`);
    return (this.connections[connection] = this.app
      .make(config.driver)
      .connect(connection));
  }

  public connection(connection?) {
    connection =
      connection || this.configService.get("database.default_connection");
    if (!this.connections[connection]) {
      this.makeConnection(connection);
    }
    return this.connections[connection];
  }

  public table(table) {
    return this.connection().table(table);
  }
}
