import { sdk } from "../../fauna/fauna-sdk-wrapper";

export const convoResolvers = {
  Query: {
    msgById: (msgId: string) => sdk.MsgById({ msgId }),
    convoFeedByUserId: (userId: string) => sdk.ConvoFeedByUserId({ userId }),
    convoById: (convoId: string) => sdk.ConvoById({ convoId }),
  },
  Mutation: {
  },
};
