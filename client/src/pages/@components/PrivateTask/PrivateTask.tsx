import type { TaskId } from 'commonTypesWithClient/ids';
import type { TaskModel } from 'commonTypesWithClient/models';
import { useState, type ChangeEvent } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import styles from './PrivateTask.module.css';

export const PrivateTask = (props: { task: TaskModel; fetchTasks: () => Promise<void> }) => {
  const [editingTaskId, setEditingTaskId] = useState<TaskId>();
  const [editingLabel, setEditingLabel] = useState('');
  const isEditing = editingTaskId === props.task.id;

  const editLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setEditingLabel(e.target.value);
  };
  const toggleDone = async (task: TaskModel) => {
    await apiClient.private.tasks
      .patch({ body: { taskId: task.id, done: !task.done, label: task.label } })
      .catch(returnNull);
    await props.fetchTasks();
  };
  const deleteTask = async (task: TaskModel) => {
    await apiClient.private.tasks.delete({ body: { taskId: task.id } }).catch(returnNull);
    await props.fetchTasks();
  };
  const updateTask = async (task: TaskModel) => {
    await apiClient.private.tasks
      .patch({ body: { taskId: task.id, done: task.done, label: editingLabel } })
      .catch(returnNull);
    setEditingTaskId(undefined);
    setEditingLabel('');
    await props.fetchTasks();
  };
  const startEditTask = (task: TaskModel) => {
    setEditingTaskId(task.id);
    setEditingLabel(task.label);
  };

  return (
    <label>
      <div className={styles.editGroup}>
        <input type="checkbox" checked={props.task.done} onChange={() => toggleDone(props.task)} />
        {isEditing ? (
          <input
            type="text"
            value={editingLabel}
            className={styles.labelInput}
            onChange={editLabel}
          />
        ) : (
          <span>{props.task.label}</span>
        )}
      </div>
      <div className={styles.btnGroup}>
        <input
          type="button"
          value="DELETE"
          className={styles.btn}
          onClick={() => deleteTask(props.task)}
        />
        {isEditing ? (
          <input
            type="button"
            value="SAVE"
            className={styles.btn}
            onClick={() => updateTask(props.task)}
          />
        ) : (
          <input
            type="button"
            value="EDIT"
            className={styles.btn}
            onClick={() => startEditTask(props.task)}
          />
        )}
      </div>
    </label>
  );
};
