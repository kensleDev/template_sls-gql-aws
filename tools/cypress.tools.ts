import { terminal } from './terminal.tools'

const args = process.argv.slice(2)


const Cypress = {
    runSingleTest: (testName: string) => {
        console.log(testName)
        terminal.send([`yarn run start-server-and-test start http://localhost:7071 cy:run -- --record --spec '../cypress/integration/${testName}.js' `])
    }
}

if (args[0] === "runSingle") {
    Cypress.runSingleTest(args[1])
}