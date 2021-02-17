import { GraphQLClient } from 'graphql-request'
import { getSdk } from './generated/sdk'
const client = new GraphQLClient('https://graphql.fauna.com/graphql', {
headers: {
Authorization: 'Bearer '+ process.env["FAUNADB_SECRET"],
'X-Schema-Preview': 'partial-update-mutation'
}
})

export const sdk = getSdk(client)
