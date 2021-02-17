import { sdk } from "../../fauna/fauna-sdk-wrapper";
import { CreateUserMutation, MutationCreateUserArgs, MutationDeleteUserArgs, MutationUpdateUserArgs, UpdateUserMutation } from "../../fauna/generated/sdk";

export const resolvers = {
  Query: {
    userById: (userId: string) => sdk.UserById({ userId }),
  },
  Mutation: {
    createUser: (args: MutationCreateUserArgs): Promise<CreateUserMutation> => sdk.CreateUser({...args}),
    updateUser: (args: MutationUpdateUserArgs): Promise<UpdateUserMutation> => sdk.UpdateUser(args),
    deleteUser: (args: MutationDeleteUserArgs) => sdk.DeleteUser(args)
  },
};
