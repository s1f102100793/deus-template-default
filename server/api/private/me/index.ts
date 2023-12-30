import type { DefineMethods } from 'aspida';
import type { UserModel } from 'commonTypesWithClient/models';

export type Methods = DefineMethods<{
  post: {
    resBody: UserModel;
  };
}>;
