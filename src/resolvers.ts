
import { environment } from './environment.ts';

export const resolvers = {
  Query: {
    testMessage: () => environment.secretMessage,
  },
};
