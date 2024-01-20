import { useAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { TaskModel } from '../api/@types';
import { userAtom } from '../atoms/user';
import { ElapsedTime } from '../features/ElapsedTime/ElapsedTime';
import { PrivateTask } from '../features/PrivateTask/PrivateTask';
import { apiClient } from '../utils/apiClient';
import { returnNull } from '../utils/returnNull';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [tasks, setTasks] = useState<TaskModel[]>();
  const [label, setLabel] = useState('');
  const [image, setImage] = useState<File>();
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const isPrivateTask = (task: TaskModel) => user?.id === task.author.userId;

  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const inputFile = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files?.[0]);
  };
  const fetchTasks = useCallback(async () => {
    await apiClient.public.tasks.$get().then(setTasks).catch(returnNull);
  }, []);
  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!label || !fileRef.current) return;

    await apiClient.private.tasks.post({ body: { label, image } }).catch(returnNull);
    setLabel('');
    setImage(undefined);
    setPreviewImageUrl('');
    fileRef.current.value = '';
    await fetchTasks();
  };

  useEffect(() => {
    const intervalId = window.setInterval(fetchTasks, 3000);
    fetchTasks();

    return () => clearInterval(intervalId);
  }, [fetchTasks]);

  useEffect(() => {
    if (!image) return;

    const newUrl = URL.createObjectURL(image);
    setPreviewImageUrl(newUrl);
    return () => {
      URL.revokeObjectURL(newUrl);
    };
  }, [image]);

  return (
    <div className={styles.container}>
      <ul className={styles.tasks}>
        {user !== null && (
          <li className={styles.createTask}>
            <input
              type="text"
              placeholder="What is happening?!"
              value={label}
              onChange={inputLabel}
              className={styles.createTaskInput}
            />
            {image && <img src={previewImageUrl} className={styles.taskImage} />}
            <input
              type="file"
              ref={fileRef}
              accept=".png,.jpg,.jpeg,.gif,.webp,.svg"
              onChange={inputFile}
            />
            <button onClick={createTask} className={styles.postBtn}>
              POST
            </button>
          </li>
        )}
        {tasks?.map((task) => (
          <div key={task.id}>
            <li className={styles.taskHeader}>
              <div className={styles.authorName}>{task.author.name}</div>
              <ElapsedTime createdTime={task.createdTime} />
            </li>
            <li className={styles.label}>
              {isPrivateTask(task) ? (
                <PrivateTask task={task} fetchTasks={fetchTasks} />
              ) : (
                <span>{task.label}</span>
              )}
              {task.image && (
                <img src={task.image.url} alt={task.label} className={styles.taskImage} />
              )}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
