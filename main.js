const { exec, ChildProcess } = require('child_process');
const expressApp = require('express')();
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const process = require('process');

/** @type {Array.<ChildProcess>} */ let processes = []

// Read configuration file
var config = JSON.parse(fs.readFileSync("./config.json").toString());

// Validate
const PORT = process.env.PORT || config.port;

let invalid = !PORT;

config.apps.forEach(app => {
   if(!app.path || !app.target)
      invalid = true;
})

if(invalid)
   console.log("Invalid configuration!\nExiting..."),
      exit(1);

// Config apps (start if needed)
/** @type {Array.<Object.<string, string>>} */ let apps = config.apps;
apps.forEach(app => {
   // Caution: TODO: Zombie processes are not handled
   if(app.command) {
      let p = exec(app.command, (err, stdout, stderr) => {
         if(err) console.log("error -", app.command+":", err.message);
         if(stderr) console.log("stderr -", app.command+":", stderr);
         if(stdout) console.log("stdout -", app.command+":", stdout);
      });
      processes.push(p);
   }

   expressApp.use(app.path, createProxyMiddleware({
      target: app.target,
      changeOrigin: app.changeOrigin,
      pathRewrite: app.pathRewrite
   }));
});

// function exitHandler(_code){
//    processes.forEach(p => p.kill());
// }

// process.on("exit", exitHandler);
// process.on("SIGINT", exitHandler);
// process.on("SIGTERM", exitHandler);
// process.on("SIGKILL", exitHandler);

expressApp.listen(PORT, () => {
   console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
