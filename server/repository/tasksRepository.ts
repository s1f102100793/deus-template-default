import type { Maybe, TaskId, UserId } from '$/commonTypesWithClient/ids';
import type { Prisma, Task, User } from '@prisma/client';
import type { TaskModel } from 'commonTypesWithClient/models';
import { randomUUID } from 'crypto';
import { taskIdParser, userIdParser } from '../service/idParsers';
import { prismaClient } from '../service/prismaClient';

const toModel = (task: Task & { User: User }): TaskModel => ({
  id: taskIdParser.parse(task.id),
  label: task.label,
  done: task.done,
  createdTime: task.createdAt.getTime(),
  author: {
    userId: userIdParser.parse(task.userId),
    githubId: task.User.githubId,
    name: task.User.displayName ?? task.User.githubId,
    photoURL: task.User.photoURL ?? undefined,
  },
});

export const getTasks = async (limit?: number): Promise<TaskModel[]> => {
  const prismaTasks = await prismaClient.task.findMany({
    take: limit,
    include: { User: true },
    orderBy: { createdAt: 'desc' },
  });

  return prismaTasks.map(toModel);
};

export const createTask = async (userId: UserId, label: TaskModel['label']): Promise<TaskModel> => {
  const prismaTask = await prismaClient.task.create({
    data: {
      id: randomUUID(),
      userId,
      done: false,
      label,
      createdAt: new Date(),
    },
    include: { User: true },
  });

  return toModel(prismaTask);
};

export const updateTaskByStringId = async (params: {
  userId: UserId;
  taskId: string;
  partialTask: Prisma.TaskUpdateInput;
}): Promise<TaskModel> => {
  const prismaTask = await prismaClient.task.update({
    where: { id: params.taskId, userId: params.userId },
    data: params.partialTask,
    include: { User: true },
  });

  return toModel(prismaTask);
};

export const deleteTaskByStringId = async (userId: UserId, taskId: string): Promise<TaskModel> => {
  const prismaTask = await prismaClient.task.delete({
    where: { id: taskId, userId },
    include: { User: true },
  });

  return toModel(prismaTask);
};

export const updateTaskByBrandedId = async (params: {
  userId: UserId;
  taskId: Maybe<TaskId>;
  partialTask: Prisma.TaskUpdateInput;
}): Promise<TaskModel> => {
  const prismaTask = await prismaClient.task.update({
    where: { id: params.taskId, userId: params.userId },
    data: params.partialTask,
    include: { User: true },
  });

  return toModel(prismaTask);
};

export const deleteTaskByBrandedId = async (
  userId: UserId,
  taskId: Maybe<TaskId>
): Promise<TaskModel> => {
  const prismaTask = await prismaClient.task.delete({
    where: { id: taskId, userId },
    include: { User: true },
  });

  return toModel(prismaTask);
};
