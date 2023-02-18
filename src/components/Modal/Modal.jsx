import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handelKeyClose = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handelKeyClose);

    return () => {
      window.removeEventListener('keydown', handelKeyClose);
    };
  }, [onClose]);

  const handelClose = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handelClose}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
