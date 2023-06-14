import React from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

function Modal({ isVisible = false, content, onClose }) {
  return isVisible ? (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
      </div>
    </div>
  ) : null;
}

Modal.propTypes = {
  isVisible: PropTypes.bool,
  content: PropTypes.element,
  onClose: PropTypes.func,
};
Modal.defaultProps = {
  isVisible: false,
  content: null,
  onClose: null,
};

export default Modal;
