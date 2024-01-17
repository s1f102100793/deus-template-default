import type { TaskModel, User } from '$/api/@types';
import { taskModel } from '$/domain/model/taskModel';
import { s3Repo } from '$/domain/repository/s3Repo';
import { taskRepo } from '$/domain/repository/taskRepo';
import { transaction } from '$/service/prismaClient';
import type { MultipartFile } from '@fastify/multipart';

export const taskUseCase = {
  create: (user: User, label: string, image: MultipartFile | undefined) =>
    transaction<TaskModel>('RepeatableRead', async (tx) => {
      const task = taskModel.create(user, label, image);

      if (image !== undefined && task.image !== undefined) {
        await s3Repo.save(task.image.s3Key, image);
      }

      await taskRepo.save(tx, task);

      return task;
    }),
  delete: (user: User, taskId: string) =>
    transaction('RepeatableRead', async (tx) => {
      const task = await taskRepo.findByIdOrThrow(tx, taskId);
      const deletableTaskId = taskModel.deleteOrThrow(user, task);

      await taskRepo.delete(tx, deletableTaskId);
    }),
  update: (user: User, taskId: string, done: boolean, label: string) =>
    transaction<TaskModel>('RepeatableRead', async (tx) => {
      const task = await taskRepo.findByIdOrThrow(tx, taskId);
      const newTask = taskModel.updateOrThrow(user, task, { done, label });

      await taskRepo.save(tx, newTask);

      return newTask;
    }),
};
