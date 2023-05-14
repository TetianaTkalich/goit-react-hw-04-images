import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

export function Modal({ onClick, selectedPicture }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  const handleCloseClick = event => {
    if (event.target === event.currentTarget) {
      onClick();
    }
  };

  return (
    <div className={css.overlay} onClick={handleCloseClick}>
      <div className={css.modal}>
        <img src={selectedPicture.largeImageURL} alt={selectedPicture.tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedPicture: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
