(async () => {
  const hsfs = require("./");
  const HTTP2Adapter = require("./adapters/HTTP2Adapter");
  const data = hsfs("https://discord.com/api/users/@me").setAdapter(HTTP2Adapter);
  console.log(data);
  console.log(await data.finalize());
  console.log(hsfs.version)
})();