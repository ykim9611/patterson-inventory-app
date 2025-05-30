import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import styles from './AddOrderPage.module.css';

function AddOrderPage(props) {
  const [procurementSpecialists, setProcurementSpecialists] = useState([]);
  const [scanInput, setScanInput] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const getProcurementSpecialists = async () => {
      const { data, error } = await supabase
        .from('procurement_specialists')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setProcurementSpecialists(data);
      }
    };

    getProcurementSpecialists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    console.log('gonna convert');
  };

  return (
    <div className={styles.container}>
      <h2>Add Order</h2>
      <div className={styles.manualEntryContainer}>
        <div>
          Customer:{' '}
          <input
            type='text'
            name='customerName'
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          Procurement Specialist:{' '}
          <select
            name='procurementSpecialist'
            id=''
            onChange={(e) => handleChange(e)}
          >
            <option value=''>Select a PS</option>
            {procurementSpecialists.map((procurementSpecialist) => {
              return (
                <option
                  key={procurementSpecialist.id}
                  value={procurementSpecialist.procurement_specialist}
                >
                  {procurementSpecialist.procurement_specialist}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className={styles.scanContainer}>
        <h2>Scan QR Code</h2>
        <div>
          <input
            type='text'
            name='scanInput'
            value={scanInput}
            className={styles.scanInput}
            onChange={(e) => setScanInput(e.target.value)}
          />
          <button onClick={handleAddClick}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default AddOrderPage;
