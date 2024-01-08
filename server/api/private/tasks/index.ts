import type { DefineMethods } from 'aspida';
import type { TaskId } from 'commonTypesWithClient/ids';
import type { TaskModel } from 'commonTypesWithClient/models';

export type Methods = DefineMethods<{
  post: {
    reqFormat: FormData;
    reqBody: {
      label: string;
      image?: Blob;
    };
    resBody: TaskModel;
  };

  patch: {
    reqBody: {
      taskId: TaskId;
      done: boolean;
      label: string;
    };
    status: 204;
    resBody: TaskModel;
  };

  delete: {
    reqBody: {
      taskId: TaskId;
    };
    status: 204;
  };
}>;
