import clsx from 'clsx';
import { Modal } from '@/components/Modal';
import cls from './ConfirmDelete.module.css';
import { useTypedDispatch, useTypedSelector } from '@/components/App/store';
import { deleteSeminar } from '../../api/seminarsApi';
import { selectDeleteStatus } from '../../model/seminarsSelectors';

interface Props {
  onClose: () => void;
  title: string;
  id: number;
}

export const ConfirmDelete = ({ onClose, title, id }: Props) => {
  const dispatch = useTypedDispatch();
  const { isLoading, isError } = useTypedSelector(selectDeleteStatus);

  const deleteSeminarHandle = async () => {
    await dispatch(deleteSeminar(id));
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      {isError ? (
        <p>При удалении семинара что-то пошло не так</p>
      ) : (
        <div>
          <p className={cls.text}>
            Вы уверены что хотите удалить семинар <span className={cls.title}>"{title}"</span> ?
          </p>
          <div className={cls.btns}>
            <button disabled={isLoading} onClick={deleteSeminarHandle} className={clsx(cls.btn, cls.green)}>
              Ок
            </button>
            <button disabled={isLoading} className={clsx(cls.btn, cls.red)} onClick={onClose}>
              Отмена
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
