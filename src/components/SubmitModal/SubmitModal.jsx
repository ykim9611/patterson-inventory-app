import React from 'react';
import Modal from 'react-bootstrap/Modal';

function SubmitModal({ showModal, handleSubmitChanges, setShowModal }) {
  return (
    <Modal
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Submit Changes
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to submit these changes?</Modal.Body>
      <Modal.Footer>
        <button onClick={() => setShowModal(false)}>Cancel</button>
        <button onClick={handleSubmitChanges}>Submit</button>
      </Modal.Footer>
    </Modal>
  );
}

export default SubmitModal;
