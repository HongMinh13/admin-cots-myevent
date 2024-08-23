import { InMemoryCache, makeVar } from '@apollo/client';
import { IUser } from '../generated/index';
import { DeepPartial } from '@apollo/client/utilities';

export const userVar = makeVar<DeepPartial<IUser>>({});

export const cache: InMemoryCache = new InMemoryCache();
