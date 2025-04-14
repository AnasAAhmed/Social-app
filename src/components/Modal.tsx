// components/Modal.js
import React, { useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import { useFocusWithin } from '@react-aria/interactions';

type ModalProps={
    isOpen:boolean;
    onClose:any;
    children:any;
    overLay?:boolean;
    // children:Readonly<{
    //     children: React.ReactNode;
    //   }>
}

const Modal = ({ isOpen, onClose, children,overLay}:ModalProps) => {
  const { focusWithinProps } = useFocusWithin({
    onBlurWithin: () => {
      // Ensure the focus remains within the modal
      if (isOpen) {
        const modalElement = document.getElementById('modal');
        if (modalElement) {
          modalElement.focus();
        }
      }

    }
  });

  useEffect(() => {
    const handleKeyDown = (event:React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown as ()=>void);
    } else {
      document.removeEventListener('keydown', handleKeyDown as ()=>void);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown as ()=>void);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${overLay&&"bg-gray-800"} bg-opacity-50 z-50`}onClick={onClose}>
      <FocusLock className='animate-modal'>
        <div id="modal" tabIndex={-1} {...focusWithinProps} onClick={e=>e.stopPropagation()}>
          {children}
        </div>
      </FocusLock>
    </div>
  );
};

export default Modal;
