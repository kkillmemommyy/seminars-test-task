import { memo, useState } from 'react';
import cls from './SeminarCard.module.css';
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete';
import { EditSeminar } from '../EditSeminar/EditSeminar';
import type { Seminar } from '../../model/seminarsTypes';

export const SeminarCard = memo(({ title, description, date, time, photo, id }: Seminar) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isEditingOpen, setIsEditingOpen] = useState(false);

  return (
    <li className={cls.card}>
      <img src={photo} alt={title} className={cls.cardImage} />
      <div className={cls.cardContent}>
        <h2 className={cls.cardTitle}>{title}</h2>
        <p className={cls.cardDescription}>{description}</p>
        <div className={cls.cardDetails}>
          <span className={cls.date}>{date}</span>
          <span className={cls.date}>{time}</span>
        </div>
        <div className={cls.cardActions}>
          <button onClick={() => setIsEditingOpen(true)} className={cls.editButton}>
            Редактировать
          </button>
          <button onClick={() => setIsDeleteConfirmOpen(true)} className={cls.deleteButton}>
            Удалить
          </button>
        </div>
      </div>
      {isDeleteConfirmOpen && <ConfirmDelete onClose={() => setIsDeleteConfirmOpen(false)} title={title} id={id} />}
      {isEditingOpen && (
        <EditSeminar
          id={id}
          title={title}
          description={description}
          date={date}
          time={time}
          photo={photo}
          onClose={() => setIsEditingOpen(false)}
        />
      )}
    </li>
  );
});
