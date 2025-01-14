const core = require('@actions/core');
const fs = require('fs');

async function run() {
  const inputPrefix = "CI_";

  const secrets = core.getInput('input');
  core.info(secrets)
  try {
    let envFileContent = '';

    Object.keys(process.env).forEach(function(key) {


      if(key.startsWith(inputPrefix)) {
        envFileContent += `${key.substring(inputPrefix.length)}=${process.env[key]}\n`;
      }
    });

    fs.writeFile('.env', envFileContent, function (error) {
      if (error) {
        core.setFailed(error.message);
      }
    });
    fs.writeFile('.env.test', envFileContent, function (error) {
      if (error) {
        core.setFailed(error.message);
      }
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()

module.exports = { run };