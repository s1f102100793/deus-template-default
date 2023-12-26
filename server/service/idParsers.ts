import { z } from 'zod';
import type { DeletableTaskId, GitHubId, TaskId, UserId } from '../commonTypesWithClient/ids';

const createIdParser = <T extends string>() => z.string() as unknown as z.ZodType<T>;

export const userIdParser = createIdParser<UserId>();
export const githubIdParser = createIdParser<GitHubId>();
export const taskIdParser = createIdParser<TaskId>();
export const deletableTaskIdParser = createIdParser<DeletableTaskId>();
