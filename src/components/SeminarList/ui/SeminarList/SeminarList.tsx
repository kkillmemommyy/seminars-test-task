import { useEffect } from 'react';
import cls from './SeminarList.module.css';
import { SeminarCard } from '../SeminarCard/SeminarCard';
import { useTypedDispatch, useTypedSelector } from '@/components/App/store';
import { selectSeminars, selectInitialFetchStatus } from '../../model/seminarsSelectors';
import { fetchSeminars } from '../../api/seminarsApi';

export const SeminarList = () => {
  const dispatch = useTypedDispatch();
  const seminars = useTypedSelector(selectSeminars);
  const { isLoading, isError } = useTypedSelector(selectInitialFetchStatus);

  useEffect(() => {
    dispatch(fetchSeminars());
  }, [dispatch]);

  if (isLoading) {
    return <div className={cls.loading}>Загрузка...</div>;
  }

  if (isError) {
    return <div className={cls.error}>Ошибка загрузки семинаров</div>;
  }

  return (
    <div className={cls.container}>
      <h1 className={cls.title}>Семинары</h1>
      <ul className={cls.grid}>
        {seminars.map((seminar) => (
          <SeminarCard
            key={seminar.id}
            id={seminar.id}
            title={seminar.title}
            description={seminar.description}
            date={seminar.date}
            time={seminar.time}
            photo={seminar.photo}
          />
        ))}
      </ul>
    </div>
  );
};
