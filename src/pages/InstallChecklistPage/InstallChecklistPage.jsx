import React, { useState } from 'react';
import styles from './InstallChecklistPage.module.css';
import Print from '../../components/Print';

function InstallChecklistPage(props) {
  const [serviceOrderNumber, setServiceOrderNumber] = useState('');

  const handleSearchServiceOrder = () => {
    console.log(serviceOrderNumber);
  };

  return (
    <div className={styles.container}>
      <h2>Install Checklist</h2>
      <div className={styles.installSearchInputContainer}>
        <label labelfor='installSearchInput'>Enter Install Number: </label>
        <input
          name='installSearchInput'
          type='text'
          onChange={(e) => setServiceOrderNumber(e.target.value)}
        />
      </div>
      <button onClick={handleSearchServiceOrder}>Find Install</button>
    </div>
  );
}

export default InstallChecklistPage;
