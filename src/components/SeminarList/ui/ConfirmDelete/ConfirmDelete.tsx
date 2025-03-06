import clsx from 'clsx';
import { Modal } from '@/components/Modal';
import cls from './ConfirmDelete.module.css';
import { useTypedDispatch, useTypedSelector } from '@/components/App/store';
import { deleteSeminar } from '../../api/seminarsApi';

interface Props {
  onClose: () => void;
  title: string;
  id: number;
}

export const ConfirmDelete = ({ onClose, title, id }: Props) => {
  const dispatch = useTypedDispatch();
  const isDeleting = useTypedSelector((state) => state.seminars.isLoading.delete);

  const deleteSeminarHandle = async () => {
    await dispatch(deleteSeminar(id));
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div>
        <p className={cls.text}>
          Вы уверены что хотите удалить семинар <span className={cls.title}>"{title}"</span> ?
        </p>
        <div className={cls.btns}>
          <button disabled={isDeleting} onClick={deleteSeminarHandle} className={clsx(cls.btn, cls.green)}>
            Ок
          </button>
          <button disabled={isDeleting} className={clsx(cls.btn, cls.red)} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </Modal>
  );
};
