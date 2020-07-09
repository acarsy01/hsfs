import * as util from "util";
import * as hsfs from "./";
import * as HTTP2Adapter from "./adapters/HTTP2Adapter";

(async () => {
  const data = hsfs("https://discord.com/api/users/@me").setAdapter(HTTP2Adapter);
  process.stdout.write(util.inspect((await data.finalize()), true, null, true) + "\n");
  process.stdout.write(hsfs.version);
})();