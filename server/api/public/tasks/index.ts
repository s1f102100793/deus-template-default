import type { TaskModel } from '$/commonTypes/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query?: {
      limit?: number;
    };
    resBody: TaskModel[];
  };
}>;
