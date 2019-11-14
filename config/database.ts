import path from "path";
import { remote } from "electron";

export default {
  /*
   |--------------------------------------------------------------------------
   | Database Driver
   |--------------------------------------------------------------------------
   | PouchDB
   |
   */
  default_connection: "pouchDb",

  connections: {
    pouchDb: {
      driver: "PouchDb",
    },
  },

  drivers: {
    PouchDb: {
      path: path.join(remote.app.getPath("userData"), "/db"),
    },
  },
};
