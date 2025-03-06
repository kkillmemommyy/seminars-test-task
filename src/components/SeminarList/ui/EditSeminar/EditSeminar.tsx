import { Modal } from '@/components/Modal';
import cls from './EditSeminar.module.css';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { seminarSchema } from '../../lib/shemes';
import { useTypedDispatch } from '@/components/App/store';
import { updateSeminar } from '../../api/seminarsApi';
import { formatDateForInput, formatDateForBackend } from '../../lib/formatters';

interface Props {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  photo: string;
  onClose: () => void;
}

type FormData = Omit<Props, 'onClose' | 'id'>;

export const EditSeminar = ({ id, title, description, date, time, photo, onClose }: Props) => {
  const dispatch = useTypedDispatch();

  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: { title, description, date: formatDateForInput(date), time, photo },
    resolver: zodResolver(seminarSchema),
    mode: 'onSubmit',
    delayError: 600,
  });

  const clearErrorsField = (field: keyof FormData, invalid: boolean) => {
    if (isSubmitted && invalid) {
      clearErrors(field);
    }
  };

  const onSubmit = (formData: FormData) => {
    const updatedSemianr = { ...formData, date: formatDateForBackend(formData.date), id };
    dispatch(updateSeminar(updatedSemianr));
    onClose();
  };

  return (
    <Modal onClose={onClose} defaultContentWidth='30%' minContentWidth='300px'>
      <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
        <h2>Редактируйте</h2>
        <Controller
          name='title'
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <label className={cls.formGroup}>
              Название
              <input
                {...field}
                type='text'
                defaultValue={title}
                onChange={(e) => {
                  clearErrorsField('title', invalid);
                  field.onChange(e);
                }}
              />
              {error && <p className={cls.error}>{error?.message}</p>}
            </label>
          )}
        />

        <Controller
          name='description'
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <label className={cls.formGroup}>
              Описание
              <textarea
                {...field}
                defaultValue={description}
                onChange={(e) => {
                  clearErrorsField('description', invalid);
                  field.onChange(e);
                }}
              />
              {error && <p className={cls.error}>{error?.message}</p>}
            </label>
          )}
        />

        <Controller
          name='date'
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <label className={cls.formGroup}>
              Дата
              <input
                {...field}
                type='date'
                defaultValue={date}
                onChange={(e) => {
                  clearErrorsField('date', invalid);
                  field.onChange(e);
                }}
              />
              {error && <p className={cls.error}>{error?.message}</p>}
            </label>
          )}
        />

        <Controller
          name='time'
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <label className={cls.formGroup}>
              Время
              <input
                {...field}
                type='time'
                defaultValue={time}
                onChange={(e) => {
                  clearErrorsField('time', invalid);
                  field.onChange(e);
                }}
              />
              {error && <p className={cls.error}>{error?.message}</p>}
            </label>
          )}
        />

        <Controller
          name='photo'
          control={control}
          render={({ field, fieldState: { error, invalid } }) => (
            <label className={cls.formGroup}>
              Ссылка на фото
              <input
                {...field}
                type='text'
                defaultValue={photo}
                onChange={(e) => {
                  clearErrorsField('photo', invalid);
                  field.onChange(e);
                }}
              />
              {error && <p className={cls.error}>{error?.message}</p>}
            </label>
          )}
        />

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
