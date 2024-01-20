import type { MultipartFile } from '@fastify/multipart';
import type { TaskModel, User } from '../../../api/@types';
import { transaction } from '../../../service/prismaClient';
import { s3 } from '../../../service/s3';
import { taskModel } from '../model/taskModel';
import { taskRepo } from '../repository/taskRepo';

export const taskUseCase = {
  create: (user: User, label: string, image: MultipartFile | undefined) =>
    transaction<TaskModel>('RepeatableRead', async (tx) => {
      const task = taskModel.create(user, label, image);

      if (image !== undefined && task.image !== undefined) {
        await s3.put(task.image.s3Key, image);
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
