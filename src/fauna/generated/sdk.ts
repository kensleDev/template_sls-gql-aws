import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Time: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};







/** 'ConvoFeed' input values */
export type ConvoFeedInput = {
  userId: Scalars['ID'];
  convos?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

/** 'Convo' input values */
export type ConvoInput = {
  convoId: Scalars['ID'];
  participants?: Maybe<Array<Maybe<Scalars['String']>>>;
  msgs?: Maybe<Array<Maybe<Scalars['ID']>>>;
  convoFeeds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


/** Allow manipulating the relationship between the types 'Msg' and 'Convo' using the field 'Msg.convo'. */
export type MsgConvoRelation = {
  /** Create a document of type 'Convo' and associate it with the current document. */
  create?: Maybe<ConvoInput>;
  /** Connect a document of type 'Convo' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
  /** If true, disconnects this document from 'Convo' */
  disconnect?: Maybe<Scalars['Boolean']>;
};

/** 'Msg' input values */
export type MsgInput = {
  msgId: Scalars['ID'];
  sender?: Maybe<MsgSenderRelation>;
  content: Scalars['String'];
  status: MsgStatus;
  readBy?: Maybe<Array<Maybe<Scalars['ID']>>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  deleteAt: Scalars['String'];
  convo?: Maybe<MsgConvoRelation>;
};

/** Allow manipulating the relationship between the types 'Msg' and 'User' using the field 'Msg.sender'. */
export type MsgSenderRelation = {
  /** Create a document of type 'User' and associate it with the current document. */
  create?: Maybe<UserInput>;
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Update an existing document in the collection of 'User' */
  updateUser?: Maybe<User>;
  /** Delete an existing document in the collection of 'Msg' */
  deleteMsg?: Maybe<Msg>;
  createUser: User;
  /** Delete an existing document in the collection of 'Convo' */
  deleteConvo?: Maybe<Convo>;
  /** Create a new document in the collection of 'Convo' */
  createConvo: Convo;
  /** Create a new document in the collection of 'ConvoFeed' */
  createConvoFeed: ConvoFeed;
  createMsg: Msg;
  /** Delete an existing document in the collection of 'ConvoFeed' */
  deleteConvoFeed?: Maybe<ConvoFeed>;
  /** Delete an existing document in the collection of 'User' */
  deleteUser?: Maybe<User>;
  updateMsg?: Maybe<Msg>;
  /** Update an existing document in the collection of 'ConvoFeed' */
  updateConvoFeed?: Maybe<ConvoFeed>;
  /** Update an existing document in the collection of 'Convo' */
  updateConvo?: Maybe<Convo>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data: UserInput;
};


export type MutationDeleteMsgArgs = {
  id: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  args?: Maybe<UserInput>;
};


export type MutationDeleteConvoArgs = {
  id: Scalars['ID'];
};


export type MutationCreateConvoArgs = {
  data: ConvoInput;
};


export type MutationCreateConvoFeedArgs = {
  data: ConvoFeedInput;
};


export type MutationCreateMsgArgs = {
  msgId: Scalars['String'];
  sender: Scalars['String'];
  content: Scalars['String'];
  status: MsgStatus;
  readBy: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type MutationDeleteConvoFeedArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateMsgArgs = {
  msgId: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  status?: Maybe<MsgStatus>;
  readBy?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};


export type MutationUpdateConvoFeedArgs = {
  id: Scalars['ID'];
  data: ConvoFeedInput;
};


export type MutationUpdateConvoArgs = {
  id: Scalars['ID'];
  data: ConvoInput;
};


export type UserInput = {
  userId?: Maybe<Scalars['ID']>;
  userName?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type Convo = {
  __typename?: 'Convo';
  /** The document's ID. */
  _id: Scalars['ID'];
  participants?: Maybe<Array<Maybe<Scalars['String']>>>;
  convoId: Scalars['ID'];
  convoFeeds?: Maybe<Array<Maybe<ConvoFeed>>>;
  msgs?: Maybe<Array<Maybe<Msg>>>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

export type ConvoFeed = {
  __typename?: 'ConvoFeed';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  userId: Scalars['ID'];
  convos?: Maybe<Array<Maybe<Convo>>>;
};

export type Msg = {
  __typename?: 'Msg';
  updatedAt: Scalars['String'];
  deleteAt: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  convo?: Maybe<Convo>;
  msgId: Scalars['ID'];
  status: MsgStatus;
  createdAt: Scalars['String'];
  content: Scalars['String'];
  sender: User;
  readBy?: Maybe<Array<Maybe<Scalars['ID']>>>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'Msg'. */
export type MsgPage = {
  __typename?: 'MsgPage';
  /** The elements of type 'Msg' in this page. */
  data: Array<Maybe<Msg>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export enum MsgStatus {
  Local = 'LOCAL',
  Server = 'SERVER',
  Delivered = 'DELIVERED',
  Read = 'READ'
}

export type Query = {
  __typename?: 'Query';
  convoFeedByUserId: ConvoFeed;
  msgByCreated: MsgPage;
  msgByUserId: MsgPage;
  msgById: MsgPage;
  /** Find a document from the collection of 'Msg' by its id. */
  findMsgByID?: Maybe<Msg>;
  /** Find a document from the collection of 'User' by its id. */
  findUserByID?: Maybe<User>;
  convoById: Convo;
  /** Find a document from the collection of 'Convo' by its id. */
  findConvoByID?: Maybe<Convo>;
  /** Find a document from the collection of 'ConvoFeed' by its id. */
  findConvoFeedByID?: Maybe<ConvoFeed>;
  userById: User;
};


export type QueryConvoFeedByUserIdArgs = {
  userId: Scalars['ID'];
};


export type QueryMsgByCreatedArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
};


export type QueryMsgByUserIdArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};


export type QueryMsgByIdArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
  msgId: Scalars['ID'];
};


export type QueryFindMsgByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryConvoByIdArgs = {
  convoId: Scalars['ID'];
};


export type QueryFindConvoByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindConvoFeedByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserByIdArgs = {
  userId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  /** The document's ID. */
  _id: Scalars['ID'];
  userId?: Maybe<Scalars['ID']>;
  userName?: Maybe<Scalars['String']>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};


export type ConvoFeedByUserIdQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type ConvoFeedByUserIdQuery = (
  { __typename?: 'Query' }
  & { convoFeedByUserId: (
    { __typename?: 'ConvoFeed' }
    & Pick<ConvoFeed, 'userId'>
    & { convos?: Maybe<Array<Maybe<(
      { __typename?: 'Convo' }
      & Pick<Convo, 'convoId' | 'participants'>
      & { msgs?: Maybe<Array<Maybe<(
        { __typename?: 'Msg' }
        & Pick<Msg, 'msgId' | 'content' | 'status' | 'readBy' | 'createdAt' | 'updatedAt'>
        & { sender: (
          { __typename?: 'User' }
          & Pick<User, 'userId'>
        ) }
      )>>> }
    )>>> }
  ) }
);

export type ConvoByIdQueryVariables = Exact<{
  convoId: Scalars['ID'];
}>;


export type ConvoByIdQuery = (
  { __typename?: 'Query' }
  & { convoById: (
    { __typename?: 'Convo' }
    & Pick<Convo, 'convoId' | 'participants'>
    & { msgs?: Maybe<Array<Maybe<(
      { __typename?: 'Msg' }
      & Pick<Msg, 'msgId' | 'content' | 'status' | 'readBy' | 'createdAt' | 'updatedAt' | 'deleteAt'>
      & { sender: (
        { __typename?: 'User' }
        & Pick<User, 'userId'>
      ) }
    )>>> }
  ) }
);

export type MsgByIdQueryVariables = Exact<{
  msgId: Scalars['ID'];
}>;


export type MsgByIdQuery = (
  { __typename?: 'Query' }
  & { msgById: (
    { __typename?: 'MsgPage' }
    & { data: Array<Maybe<(
      { __typename?: 'Msg' }
      & Pick<Msg, 'msgId' | 'content' | 'status' | 'readBy' | 'createdAt' | 'updatedAt' | 'deleteAt'>
      & { sender: (
        { __typename?: 'User' }
        & Pick<User, 'userId'>
      ) }
    )>> }
  ) }
);

export type CreateUserMutationVariables = Exact<{
  args?: Maybe<UserInput>;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'userName' | 'avatar'>
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  data: UserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'userName' | 'avatar'>
  )> }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'userName'>
  )> }
);

export type UserByIdQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UserByIdQuery = (
  { __typename?: 'Query' }
  & { userById: (
    { __typename?: 'User' }
    & Pick<User, 'userId' | 'userName' | 'avatar'>
  ) }
);


export const ConvoFeedByUserIdDocument = gql`
    query ConvoFeedByUserId($userId: ID!) {
  convoFeedByUserId(userId: $userId) {
    userId
    convos {
      convoId
      participants
      msgs {
        msgId
        sender {
          userId
        }
        content
        status
        readBy
        createdAt
        updatedAt
      }
    }
  }
}
    `;
export const ConvoByIdDocument = gql`
    query ConvoById($convoId: ID!) {
  convoById(convoId: $convoId) {
    convoId
    participants
    msgs {
      msgId
      sender {
        userId
      }
      content
      status
      readBy
      createdAt
      updatedAt
      deleteAt
    }
  }
}
    `;
export const MsgByIdDocument = gql`
    query MsgById($msgId: ID!) {
  msgById(msgId: $msgId) {
    data {
      msgId
      sender {
        userId
      }
      content
      status
      readBy
      createdAt
      updatedAt
      deleteAt
    }
  }
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($args: UserInput) {
  createUser(args: $args) {
    userId
    userName
    avatar
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $data: UserInput!) {
  updateUser(id: $id, data: $data) {
    userId
    userName
    avatar
  }
}
    `;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    userId
    userName
  }
}
    `;
export const UserByIdDocument = gql`
    query UserById($userId: ID!) {
  userById(userId: $userId) {
    userId
    userName
    avatar
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    ConvoFeedByUserId(variables: ConvoFeedByUserIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ConvoFeedByUserIdQuery> {
      return withWrapper(() => client.request<ConvoFeedByUserIdQuery>(print(ConvoFeedByUserIdDocument), variables, requestHeaders));
    },
    ConvoById(variables: ConvoByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ConvoByIdQuery> {
      return withWrapper(() => client.request<ConvoByIdQuery>(print(ConvoByIdDocument), variables, requestHeaders));
    },
    MsgById(variables: MsgByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MsgByIdQuery> {
      return withWrapper(() => client.request<MsgByIdQuery>(print(MsgByIdDocument), variables, requestHeaders));
    },
    CreateUser(variables?: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper(() => client.request<CreateUserMutation>(print(CreateUserDocument), variables, requestHeaders));
    },
    UpdateUser(variables: UpdateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateUserMutation> {
      return withWrapper(() => client.request<UpdateUserMutation>(print(UpdateUserDocument), variables, requestHeaders));
    },
    DeleteUser(variables: DeleteUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUserMutation> {
      return withWrapper(() => client.request<DeleteUserMutation>(print(DeleteUserDocument), variables, requestHeaders));
    },
    UserById(variables: UserByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserByIdQuery> {
      return withWrapper(() => client.request<UserByIdQuery>(print(UserByIdDocument), variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;