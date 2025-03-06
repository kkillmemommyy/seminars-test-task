import { ReactNode, MouseEvent, useState, useRef, useEffect, useCallback } from 'react';
import { Portal } from './Portal';
import cls from './Modal.module.css';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  defaultContentWidth?: string;
  minContentWidth?: string;
}

const CLOSE_ANIMATION_DELAY = 200;

export const Modal = (props: Props) => {
  const { children, className, defaultContentWidth = 'auto', minContentWidth = 'auto', onClose } = props;

  const [isClosing, setIsClosing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const closeHandler = useCallback(() => {
    setIsClosing(true);
    timerRef.current = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, CLOSE_ANIMATION_DELAY);
  }, [onClose]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsOpen(true);
    }, 0);

    return () => clearTimeout(timerId);
  }, []);

  const onContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  return (
    <Portal>
      <div className={clsx(cls.Modal, mods, className)}>
        <div className={cls.overlay} onClick={closeHandler}>
          <div
            style={{ width: defaultContentWidth, minWidth: minContentWidth }}
            className={cls.content}
            onClick={onContentClick}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
