import styles from './ElapsedTime.module.css';

export const ElapsedTime = (props: { createdTime: number }) => {
  const now = Date.now();
  const secondsPast = (now - props.createdTime) / 1000;

  let displayDate;
  if (secondsPast < 60) {
    displayDate = `${Math.round(secondsPast)}s`;
  } else if (secondsPast < 3600) {
    displayDate = `${Math.round(secondsPast / 60)}m`;
  } else if (secondsPast <= 86400) {
    displayDate = `${Math.round(secondsPast / 3600)}h`;
  } else {
    const date = new Date(props.createdTime);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear() === new Date().getFullYear() ? '' : ` ${date.getFullYear()}`;
    displayDate = `${month} ${day}${year}`;
  }

  return <span className={styles.date}>{displayDate}</span>;
};
