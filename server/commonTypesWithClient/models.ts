import type { GitHubId, TaskId, UserId } from './ids';

export type UserModel = {
  id: UserId;
  githubId: GitHubId;
  email: string;
  displayName: string | undefined;
  photoURL: string | undefined;
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
    githubId: string;
    name: string;
    photoURL: string | undefined;
  };
};
