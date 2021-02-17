var exec = require("child_process").exec;
const chalk = require("chalk");

const log = {
  error: chalk.bold.red,
  info: chalk.bold.blue,
  success: chalk.bold.green,
};

// ...

function cmd(label, cmd, rootFolder) {
  return new Promise((res, rej) => {
    exec(`cd ${rootFolder} && ${cmd}`, (err, stdout, stderr) => {
      if (err) {
        log.error(err);
        rej({ stdout, err });
      } else if (stderr.length > 0) {
        log.error({ stdout, stderr });
        rej({ stdout, stderr });
      } else {
        console.info(`${label + " -> "} 
${log.success(stdout)}`);
        res(label);
      }
    });
  });
}

module.exports = {
  cmd,
};
