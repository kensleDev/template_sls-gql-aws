import { userResolvers} from './user.resolvers'
import { convoResolvers} from './convo.resolvers'

import merge from 'lodash.merge'

export const resolvers = merge(userResolvers, convoResolvers)
