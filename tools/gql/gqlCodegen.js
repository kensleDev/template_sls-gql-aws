 /* eslint-disable */
const fs = require('fs')

const args = process.argv.slice(2);

const gqlTools = {
  // converts gql file into a ts types
  gql2TsTypes: (schemaPath, newSchemaLocation) => {
    const schemaText = fs.readFileSync(schemaPath, { encoding: 'utf8' })
    const schemaCode = schemaText
      .replace(/@relation/g, '')
      .replace(/(^|\n)(\s*)#/g, '$1$2//')
      .replace(/(input|type)\s/g, 'export interface ')
      .replace(/enum\s/g, 'export enum ')
      .replace(/schema\s/, 'export interface schema ')
      .replace(/union\s/, 'export type ')
      .replace(/^(\s+[a-zA-Z0-9_-]+\s*)\([^\)]+\)(\s*:\s*)/g, '$1$2')
      .replace(/("""((?!""")[\s\S])+""")?\s*scalar\s+(.*?)\r?\n/g, 'export type $3 = any;\n')
      .replace(/(\s*)"""([\s\S]*?)"""/g, (m, s, p) => {
        const pad = ' '.repeat(s.replace(/\r?\n/g, '').length)
        return `\n${pad}/**\n${p
          .replace(/(\r?\n){2,}/, '')
          .trim()
          .split(/\r?\n/)
          .map((l) => `${pad} * ${l.trim()}`)
          .join('\n')}\n ${pad}*/\n`
      })
      .replace(/(\r?\n){2,}/g, '\n')
      .replace(
        /([:=|]\s*)\[ID!?\](!?)($|\s+|\))/g,
        (m, f, r, e) => `${r ? '' : '?'}${f}string[];${e}`
      )
      .replace(/([:=|]\s*)ID(!?)($|\s+|\))/g, (m, f, r, e) => `${r ? '' : '?'}${f}string;${e}`)
      .replace(
        /([:=|]\s*)\[String!?\](!?)($|\s+|\))/g,
        (m, f, r, e) => `${r ? '' : '?'}${f}string[];${e}`
      )
      .replace(/([:=|]\s*)String(!?)($|\s+|\))/g, (m, f, r, e) => `${r ? '' : '?'}${f}string;${e}`)
      .replace(
        /([:=|]\s*)\[Float!?\](!?)($|\s+|\))/g,
        (m, f, r, e) => `${r ? '' : '?'}${f}number[];${e}`
      )
      .replace(/([:=|]\s*)Float(!?)($|\s+|\))/g, (m, f, r, e) => `${r ? '' : '?'}${f}number;${e}`)
      .replace(
        /([:=|]\s*)\[Int!?\](!?)($|\s+|\))/g,
        (m, f, r, e) => `${r ? '' : '?'}${f}number[];${e}`
      )
      .replace(/([:=|]\s*)Int(!?)($|\s+|\))/g, (m, f, r, e) => `${r ? '' : '?'}${f}number;${e}`)
      .replace(
        /([:=|]\s*)\[DateTime!?\](!?)($|\s+|\))/g,
        (m, f, r, e) => `${r ? '' : '?'}${f}Date[];${e}`
      )
      .replace(/([:=|]\s*)DateTime(!?)($|\s+|\))/g, (m, f, r, e) => `${r ? '' : '?'}${f}Date;${e}`)
      .replace(
        /([:=|]\s*)\[Boolean!?\](!?)($|\s+|\))/g,
        (m, f, r, e) => `${r ? '' : '?'}${f}boolean[];${e}`
      )
      .replace(
        /([:=|]\s*)Boolean(!?)($|\s+|\))/g,
        (m, f, r, e) => `${r ? '' : '?'}${f}boolean;${e}`
      )
      .replace(
        /([:=|]\s*)\[([a-zA-Z0-9_-]+)!?\](!?)/g,
        (m, f, t, r) => `${r ? '' : '?'}${f}${t}[];`
      )
      .replace(
        /([:=|]\s*)((?!string|number|boolean|Date)[a-zA-Z0-9_-]+)(!?)/g,
        (m, f, t, r) => `${r ? '' : '?'}${f}${t};`
      )
      .replace(/\?{2,}:/g, '?:')
      .replace(/;{2,}/g, ';')
      .replace(/(enum\s+[^{]+?\s*\{)([^}]*)(\})/g, (m, d, b, e) => {
        b = b
          .split(/\r?\n/)
          .filter((l) => l.trim())
          .map((l) => `${l} = '${l.trim()}'`)
          .join(',\n')
        return `${d}\n${b}\n${e}`
      })
      .replace(/(\([^\)]+\))\??/g, (m, b) => b.replace(/(.+:.+);/g, '$1,'))
      .replace(/;\[\];/g, '[];')
      .replace(/(\s+)\?=/g, '$1=')
      .replace(/(interface\s+.*?\s+)implements\s/g, '$1extends ')
      .replace(/,\)/g, ')')
      .replace(/(enum[^{]+\{[^}]+[^\s,])(\s*\})/g, '$1,$2')
      .replace(/\s*$/, '\n')

    if (newSchemaLocation.length > 0) {
      fs.writeFile(newSchemaLocation, schemaCode.trim(), (err) => {
        if (err) return console.log(err)
        console.log('Update Schema: ' + newSchemaLocation)
      })
    }
 },
  // converts gql file into a ts variable
  gql2TsString: (schemaPath, newSchemaLocation) => {
    const schemaText = fs.readFileSync(schemaPath, { encoding: 'utf8' })
    const schemaCode = schemaText.replace(/@relation/g, '').replace(/@unique/g, '')
.replace(/@resolver/g, '')
    const tsWrapper = (schemaCode) => `
import gql from 'graphql-tag'
export const typeDefs = gql\`
${schemaCode}
\`
    `

    if (newSchemaLocation.length > 0) {
      fs.writeFile(newSchemaLocation, tsWrapper(schemaCode).trim(), (err) => {
        if (err) return console.log(err)
        console.log(' ✔ Generated Schema: ' + newSchemaLocation)
      })
    }
  },

}

const gqlSchema = args[0]
const tsSchema = args[1]
// const generatedTypes = args[2]

gqlTools.gql2TsString(gqlSchema, tsSchema)
// gqlTools.gql2TsTypes(gqlSchema, generatedTypes)



