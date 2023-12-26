import type { TaskModel } from 'commonTypesWithClient/models';
import { useAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [tasks, setTasks] = useState<TaskModel[]>();
  const [label, setLabel] = useState('');
  const [image, setImage] = useState<File>();
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const inputFile = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0]);
  };
  const fetchTasks = async () => {
    const tasks = await apiClient.public.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };
  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!label || !fileRef.current) return;

    await apiClient.private.tasks.post({ body: { label, image } }).catch(returnNull);
    setLabel('');
    setImage(undefined);
    fileRef.current.value = '';
    await fetchTasks();
  };
  const toggleDone = async (task: TaskModel) => {
    await apiClient.private.tasks
      .patch({ body: { taskId: task.id, done: !task.done } })
      .catch(returnNull);
    await fetchTasks();
  };
  const deleteTask = async (task: TaskModel) => {
    await apiClient.private.tasks.delete({ body: { taskId: task.id } }).catch(returnNull);
    await fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (!tasks) return <Loading visible />;

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.container}>
        {user === null ? (
          <ul className={styles.tasks}>
            {tasks.map((task) => (
              <li key={task.id}>
                <label>
                  <span>{task.label}</span>
                  {task.image && <img src={task.image.url} width="100%" />}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <form style={{ textAlign: 'center' }} onSubmit={createTask}>
              <input value={label} type="text" onChange={inputLabel} />
              <input type="submit" value="ADD" />
              <div>
                <input
                  type="file"
                  ref={fileRef}
                  accept=".png,.jpg,.jpeg,.gif,.webp,.svg"
                  onChange={inputFile}
                />
              </div>
            </form>
            <ul className={styles.tasks}>
              {tasks.map((task) => (
                <li key={task.id}>
                  <label>
                    <input type="checkbox" checked={task.done} onChange={() => toggleDone(task)} />
                    <span>{task.label}</span>
                  </label>
                  {task.image && <img src={task.image.url} width="100%" />}
                  <input
                    type="button"
                    value="DELETE"
                    className={styles.deleteBtn}
                    onClick={() => deleteTask(task)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
