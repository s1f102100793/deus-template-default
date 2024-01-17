import type { TaskModel, User } from '$/api/@types';
import { S3_PREFIX } from '$/domain/repository/s3Repo';
import type { MultipartFile } from '@fastify/multipart';
import { randomUUID } from 'crypto';

const dataToUrl = (data: MultipartFile) => {
  const s3Key = `tasks/images/${randomUUID()}.${data.filename.split('.').at(-1)}`;

  return { url: `${S3_PREFIX}${s3Key}`, s3Key };
};

export type DeletableTaskId = { type: 'DeletableTask'; val: string };

export const taskModel = {
  create: (user: User, label: string, data: MultipartFile | undefined): TaskModel => ({
    id: randomUUID(),
    done: false,
    label,
    image: data === undefined ? undefined : dataToUrl(data),
    createdTime: Date.now(),
    author: { userId: user.id, name: user.name },
  }),
  deleteOrThrow: (user: User, task: TaskModel): DeletableTaskId => {
    if (user.id !== task.author.userId) throw new Error('cannot delete');

    return { type: 'DeletableTask', val: task.id };
  },
  updateOrThrow: (
    user: User,
    task: TaskModel,
    updateData: { done: boolean; label: string }
  ): TaskModel => {
    if (user.id !== task.author.userId) throw new Error('cannot update task');

    return { ...task, ...updateData };
  },
};
