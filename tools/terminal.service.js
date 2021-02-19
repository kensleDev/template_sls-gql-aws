var exec = require("child_process").exec;
const chalk = require("chalk");

const log = (logLevel, input) => {
  const colors = {
    error: chalk.bold.red,
    info: chalk.bold.blue,
    success: chalk.bold.green,
  };

  console.log(colors[logLevel](input));
};

// ...

function cmd(label, cmd, rootFolder) {
  return new Promise((res, rej) => {
    exec(`cd ${rootFolder} && ${cmd}`, (err, stdout, stderr) => {
      log("info", label);
      log("success", stdout);
      if (err || stderr.length > 0) {
        log("error", err);
        log("error", stderr);
        rej({ err, stdout, stderr });
      }

      res(label);
      //     }
    });
  });
}

module.exports = {
  cmd,
};
