import type { DeletableTaskId, TaskId } from '$/commonTypes/ids';
import type { TaskModel } from '$/commonTypes/models';
import type { Prisma, Task, User } from '@prisma/client';
import { S3_PREFIX } from './s3Repo';

const toModel = (task: Task & { User: User }): TaskModel => ({
  id: { type: 'Task', val: task.id },
  label: task.label,
  done: task.done,
  createdTime: task.createdAt.getTime(),
  image:
    task.imageKey === null
      ? undefined
      : { url: `${S3_PREFIX}${task.imageKey}`, s3Key: task.imageKey },
  author: { userId: { type: 'User', val: task.userId }, name: task.User.name },
});

export const taskRepo = {
  save: async (tx: Prisma.TransactionClient, task: TaskModel) => {
    await tx.task.upsert({
      where: { id: task.id.val },
      update: { done: task.done, label: task.label, imageKey: task.image?.s3Key },
      create: {
        id: task.id.val,
        userId: task.author.userId.val,
        done: task.done,
        label: task.label,
        imageKey: task.image?.s3Key,
        createdAt: new Date(task.createdTime),
      },
    });
  },
  delete: async (tx: Prisma.TransactionClient, deletableTaskId: DeletableTaskId) => {
    await tx.task.delete({ where: { id: deletableTaskId.val } });
  },
  findAll: (tx: Prisma.TransactionClient, limit?: number): Promise<TaskModel[]> =>
    tx.task
      .findMany({ take: limit, include: { User: true }, orderBy: { createdAt: 'desc' } })
      .then((tasks) => tasks.map(toModel)),
  findByIdOrThrow: (tx: Prisma.TransactionClient, id: TaskId): Promise<TaskModel> =>
    tx.task.findUniqueOrThrow({ where: { id: id.val }, include: { User: true } }).then(toModel),
};
