type Id<T extends string> = { type: T; val: string };

export type UserId = Id<'User'>;
export type TaskId = Id<'Task'>;
export type DeletableTaskId = Id<'DeletableTask'>;
