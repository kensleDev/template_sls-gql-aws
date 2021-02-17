require("dotenv").config();

var path = require("path");

// const chokidar = require('chokidar');

const rootFolder = path.join(__dirname, "..", "..");
const terminal = require("../terminal.service");

console.log(rootFolder);

async function faunaPipeline(rootFolder) {
  const npmBin = rootFolder + "/node_modules/.bin";

  try {
    // Upload to fauna
    // await terminal.cmd("✈️ Upload Schema", `${npmBin}/fauna-gql`, rootFolder);

    // Generate Typescript from fauna gql
    await terminal.cmd(
      "♻️ Generate Typescript from Schema",
      `${npmBin}/graphql-codegen -c src/fauna/fauna-sdk.yml -r dotenv/config`,
      rootFolder
    );

    // Generate Typescript schema version
    // await terminal.cmd(
    // "♻️ Generate Typescript version of Schema",
    // `node ./tools/gql/gqlCodegen.js ./src/fauna/generated/fauna.schema.graphql ./src/fauna/generated/fauna.schema.ts`,
    // rootFolder
    // );
  } catch (e) {
    console.error(e);
  }
}

faunaPipeline(rootFolder);

// function watchGql() {
//     chokidar.watch('*.gql').on('all', (event, path) => {
//         console.log(event, path);
//     });
// }

// watchGql()
