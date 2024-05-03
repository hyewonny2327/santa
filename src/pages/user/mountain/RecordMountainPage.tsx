import { useQuery } from '@tanstack/react-query';

import styles from './RecordMountainPage.module.scss';
import { PiMedal } from 'react-icons/pi';
import { getMyMountains } from '/src/services/challengeApi';
import RecordList from './components/RecordList';

export default function RecordMountainPage() {
  const {
    data: myMountains,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ['myMountains'],
    queryFn: getMyMountains,
    select: (data) => data.data.content,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const SUCCESS = isFetched && !isError;
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.title}>나의 업적</div>
        <PiMedal className={styles.icon} />
      </div>
      <div className={styles.bottom}>{SUCCESS && <RecordList myMountains={myMountains} />}</div>
    </div>
  );
}
