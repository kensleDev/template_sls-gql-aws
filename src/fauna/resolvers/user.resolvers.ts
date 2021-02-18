import { sdk } from "../../fauna/fauna-sdk-wrapper";
import { CreateUserMutation, MutationCreateUserArgs, MutationDeleteUserArgs, MutationUpdateUserArgs, UpdateUserMutation } from "../../fauna/generated/sdk";

export const userResolvers = {
  Query: {
    userById: (userId: string) => sdk.UserById({ userId }),
  },
  Mutation: {
    createUser: (userId: string, userName: string, avatar: string): Promise<CreateUserMutation> => {
      console.log(userId)
      return sdk.CreateUser({userId, userName, avatar})
    },
    updateUser: (args: MutationUpdateUserArgs): Promise<UpdateUserMutation> => sdk.UpdateUser(args),
    deleteUser: (args: MutationDeleteUserArgs) => sdk.DeleteUser(args)
  },
};
