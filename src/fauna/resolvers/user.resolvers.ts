import { sdk } from "../../fauna/fauna-sdk-wrapper";
import { CreateUserMutation, CreateUserMutationVariables, MutationCreateUserArgs, MutationDeleteUserArgs, MutationUpdateUserArgs, UpdateUserMutation } from "../../fauna/generated/sdk";

export const userResolvers = {
  Query: {
    userById: (userId: string) => sdk.UserById({ userId }),
  },
  Mutation: {
    createUser: (args: CreateUserMutationVariables): Promise<CreateUserMutation> => {
      // console.log(userId)
      return sdk.CreateUser(args)
    },
    updateUser: (args: MutationUpdateUserArgs): Promise<UpdateUserMutation> => sdk.UpdateUser(args),
    deleteUser: (args: MutationDeleteUserArgs) => sdk.DeleteUser(args)
  },
};
