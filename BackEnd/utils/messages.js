const chalk = require("chalk");

exports.showErrorSQL = (err) => {
    console.group(chalk.red.bold('ERROR SQL'))
  console.error(chalk.red(err.code), chalk.blue(err.sqlMessage));
  console.error(chalk.yellow(err.sql));
  console.groupEnd();
};
