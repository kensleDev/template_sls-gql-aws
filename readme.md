### GQL Fauna DB Workflow

#### General overview

This workflow can work for an external GQL api.

Fauna DB when provided with a graphql schema with provision the required resources needed to support that endpoint including tables, indexes and a new GQL schema to expose CRUD operations.

For a working example go the [GQl Codegen homepage]() and add the following the codegen.yml:

```
generates:
  types.ts:
    plugins:
      - typescript
```

Now have a look at the types.ts output! It generated a fully typed version of our schema at little cost to us!

This is extemely powerful as we can take advantage of GQL tooling to get that schema back into our API to expose to the client. On top of that we can use that same tooling [GQL Codegen]() to generate fully typed request libraries for specific front ends, if you add:

```
      - typescript-operations
      - typescript-graphql-request
```

to the above example you will see it generates a http client function based on (graphql-request)[]!

We can use this in our api resolvers for all database based transactions, meaning we don't have to write of the implementation when it comes to interacting with the database!

If working with the frontend we could use:

```
    - typescript-apollo-angular
```

to generate a fully typed service to interact with the database! In practice we wouldn't connect the database straight to the frontend and use a seperate codegen.yml in the frontend to generate a service based on what we are exposing via out api.

You may notice that in types.ts our sdk function returns nothing:

```
const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
```

This is becuase we need to tell codegen what the implmentation of our queries and mutations is as we have only told it the schema. I would have thought that it would be able to generate these files also but we need a level of control over the implementation or there would be no way to tweak the query i.e. to return X number of records

In the above example you can implement a query to see this take shape, adding:

```
query user($id: ID!) {
    user(id: $id) {
        username
    }
}
```

now returns:

```
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    user(variables: UserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserQuery> {
      return withWrapper(() => client.request<UserQuery>(print(UserDocument), variables, requestHeaders));
    }
  };
}
```

The functions exported from getSkk can then be used either in a frontend directly or consumed by our backend resolvers/api to then forward onto the client (keeps secrets out of the frontend).

#### How it works in this project

The aim is to work with only .graphql files to generate all the required typescript/gql to interact with the database with the exception of resolvers which could require further implementation so are configured manually(for now).

With that in mind the dir structure is:

```
- src
-- fauna

--- generated                  <-- codegen output dir
---- sdk.ts                    <-- fully typed sdk for interacting with fauna
---- fauna.schema.graphql      <-- schema downloaded from fauna (with crud operations)

--- operations                 <-- queries and mutations dir
--- schema.graphql             <-- the main schema
--- fauna-sdk.yml              <-- codegen config
--- fauna-sdk-wrapper.ts       <-- ts wrapper for importing sdk

-- msg_api
--- apollo-server.ts           <-- apollo server, external gql api
--- resolvers.ts               <-- ts implementations of queries & mutations
```

There is a script in tools/fauna/fauna.pipeline.js that runs the tooling required to upload the current schema to fauna and regenerate all the required reseources, it can be run with

```
yarn run pipe:fauna
```

### Resources

- [Graphql Typescript imports](https://dev.to/open-graphql/how-to-resolve-import-for-the-graphql-file-with-typescript-and-webpack-35lf)
