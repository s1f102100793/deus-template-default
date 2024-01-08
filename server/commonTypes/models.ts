import type { TaskId, UserId } from './ids';

export type UserModel = {
  id: UserId;
  email: string;
  name: string;
  createdTime: number;
};

export type TaskModel = {
  id: TaskId;
  label: string;
  done: boolean;
  createdTime: number;
  image: { url: string; s3Key: string } | undefined;
  author: {
    userId: UserId;
    name: string;
  };
};
