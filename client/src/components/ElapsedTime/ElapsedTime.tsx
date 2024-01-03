import { useEffect, useState } from 'react';
import styles from './ElapsedTime.module.css';

export const ElapsedTime = (props: { createdTime: number }) => {
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    const calculateTime = () => {
      const now = Date.now();
      const secondsPast = (now - props.createdTime) / 1000;

      if (secondsPast < 60) {
        return `${Math.round(secondsPast)}s`;
      } else if (secondsPast < 3600) {
        return `${Math.round(secondsPast / 60)}m`;
      } else if (secondsPast <= 86400) {
        return `${Math.round(secondsPast / 3600)}h`;
      } else {
        const date = new Date(props.createdTime);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year =
          date.getFullYear() === new Date().getFullYear() ? '' : ` ${date.getFullYear()}`;
        return `${month} ${day}${year}`;
      }
    };

    setDisplayDate(calculateTime());
  }, [props.createdTime]);

  return <span className={styles.date}>{displayDate}</span>;
};
