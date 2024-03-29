export type User = {
  id: string;
  email: string;
  name: string;
};

export type TaskModel = {
  id: string;
  label: string;
  done: boolean;
  createdTime: number;
  image: { url: string; s3Key: string } | undefined;
  author: { userId: string; name: string };
};
