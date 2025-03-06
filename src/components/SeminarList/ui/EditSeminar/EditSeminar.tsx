import { Modal } from '@/components/Modal';
import cls from './EditSeminar.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { seminarSchema } from '../../lib/shemes';

interface Props {
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
  onClose: () => void;
}

type FormData = Omit<Props, 'onClose'>

export const EditSeminar = ({ title, description, date, time, photo, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted, isDirty },
    clearErrors,
    reset,
  } = useForm<FormData>({
    defaultValues: { title, description, date, time, photo },
    resolver: zodResolver(seminarSchema),
    mode: 'onSubmit',
    delayError: 600,
  });

  return (
    <Modal onClose={onClose} defaultContentWidth='30%' minContentWidth='300px'>
      <form className={cls.form}>
        <h2>Редактируйте</h2>

        <label className={cls.formGroup}>
          Название
          <input type='text' name='title' defaultValue={title} />
        </label>

        <label className={cls.formGroup}>
          Описание
          <textarea name='description' defaultValue={description} />
        </label>

        <label className={cls.formGroup}>
          Дата
          <input type='date' name='date' defaultValue={date} />
        </label>

        <label className={cls.formGroup}>
          Время
          <input type='time' name='time' defaultValue={time} />
        </label>

        <label className={cls.formGroup}>
          Ссылка на фото
          <input type='text' name='photo' defaultValue={photo} />
        </label>

        <div className={cls.formActions}>
          <button type='submit' className={cls.saveButton}>
            Сохранить
          </button>
          <button type='button' onClick={onClose} className={cls.cancelButton}>
            Отмена
          </button>
        </div>
      </form>
    </Modal>
  );
};
