import { Modal } from '@/components/Modal';
import cls from './EditSeminar.module.css';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { seminarSchema } from '../../lib/shemes';
import { useTypedDispatch, useTypedSelector } from '@/components/App/store';
import { updateSeminar } from '../../api/seminarsApi';
import { formatDateForInput, formatDateForBackend } from '../../lib/formatters';
import { Seminar } from '../../model/seminarsTypes';
import { selectUpdateStatus } from '../../model/seminarsSelectors';

interface Props extends Seminar {
  onClose: () => void;
}

type FormData = Omit<Props, 'onClose' | 'id'>;

export const EditSeminar = ({ id, title, description, date, time, photo, onClose }: Props) => {
  const dispatch = useTypedDispatch();
  const { isLoading, isError } = useTypedSelector(selectUpdateStatus);

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
      {isError ? (
        <p>При редактировании что-то пошло не так</p>
      ) : (
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
            <button type='submit' className={cls.saveButton} disabled={isLoading}>
              Сохранить
            </button>
            <button type='button' onClick={onClose} className={cls.cancelButton} disabled={isLoading}>
              Отмена
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
