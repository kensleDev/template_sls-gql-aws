require("dotenv").config();

const args = process.argv.slice(2);
const path = require("path");
const rootFolder = path.join(__dirname, "..", "..");
const terminal = require("../terminal.service");

function junction(args) {
  if (args[0] === "schema") {
    processSchema(rootFolder);
  } else if (args[0] === "dev") {
    startFaunaDev();
  }
}

junction(args);

async function processSchema(rootFolder) {
  const npmBin = rootFolder + "/node_modules/.bin";

  try {
    // Upload to fauna
    await terminal.cmd("✈️ Upload Schema", `${npmBin}/fauna-gql`, rootFolder);

    // Generate Typescript from fauna gql
    await terminal.cmd(
      "♻️ Generate Typescript from Schema",
      `${npmBin}/graphql-codegen -c src/fauna/fauna-sdk.yml -r dotenv/config`,
      rootFolder
    );
  } catch (e) {
    console.error(e);
  }
}

async function startFaunaDev() {
  console.log("Fauna DB started on port 8084");
  try {
    // Start local fauna docker image with persistent storage
    await terminal.cmd(
      "Start Fauna Dev",
      "docker run --rm --name faunadb -p 8443:8443 -p 8084:8084 -v /Users/kd/repos/template_sls-gql-aws/src/fauna/local:/var/lib/faunadb -v /Users/kd/repos/template_sls-gql-aws/src/fauna/local:/var/log/faunadb fauna/faunadb",
      rootFolder
    );
  } catch (e) {}
}
