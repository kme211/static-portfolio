const chalk = require("chalk");

module.exports = {
  info: msg => console.log(chalk.blue(msg)),
  success: msg => console.log(chalk.green(msg)),
  error: error => console.error(chalk.red(error))
};
