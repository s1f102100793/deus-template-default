import type { TaskId } from '$/commonTypes/ids';
import type { TaskModel } from '$/commonTypes/models';
import type { DefineMethods } from 'aspida';

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
