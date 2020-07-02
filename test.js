(async () => {
  const util = require("util");
  const hsfs = require("./");
  const HTTP2Adapter = require("./adapters/HTTP2Adapter");
  const data = hsfs("https://discord.com/api/users/@me").setAdapter(HTTP2Adapter);
  process.stdout.write(util.inspect((await data.finalize()), true, null, true) + "\n");
  process.stdout.write(hsfs.version)
})();