import { resolvers as userResolvers} from './user.resolvers'
import { resolvers as convoResolvers} from './convo.resolvers'


export const resolvers = {
  ...userResolvers,
  ...convoResolvers
}


