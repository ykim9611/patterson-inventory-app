import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { supabase } from '../../services/supabaseClient';

function NewPartNumberModal({ show, setShow, partNumber, onSave }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveClick = async () => {
    if (!description.trim()) return;

    setLoading(true);

    // ✅ Save to the database (supabase `parts` table)
    const { error } = await supabase.from('parts').insert([
      {
        part_number: partNumber,
        part_description: description,
      },
    ]);

    if (error) {
      console.error('Error saving part description:', error);
    } else {
      onSave(partNumber, description); // ✅ update state in parent
      setDescription('');
      setShow(false);
    }

    setLoading(false);
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop='static'
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Missing Part Description</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Part number <strong>{partNumber}</strong> was not found in the
          database.
        </p>
        <input
          type='text'
          value={description}
          placeholder='Enter part description'
          onChange={(e) => setDescription(e.target.value)}
          className='form-control'
          disabled={loading}
        />
      </Modal.Body>
      <Modal.Footer>
        <button
          style={{ backgroundColor: '#6c757d' }}
          onClick={() => setShow(false)}
          disabled={loading}
        >
          Cancel
        </button>
        <button onClick={handleSaveClick} disabled={loading}>
          {loading ? 'Saving...' : 'Save Description'}
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewPartNumberModal;
