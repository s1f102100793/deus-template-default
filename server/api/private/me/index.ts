import type { UserModel } from '$/commonTypes/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    resBody: UserModel;
  };
}>;
