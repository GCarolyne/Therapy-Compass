import { ReactNode, useEffect, useRef } from 'react';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export function Modal({ children, isOpen, onClose }: Props) {
  const modals = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modals.current?.showModal();
    } else {
      modals.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={modals} onClose={onClose}>
      {children}
    </dialog>
  );
}
