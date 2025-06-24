import React from 'react';
import styles from './ScanInput.module.css';

function ScanInput({
  scanInput,
  scanInputRef,
  setScanInput,
  handleAddClick,
  stageAddButtonEnabled,
}) {
  return (
    <div className={styles.scanContainer}>
      <h2 className={styles.h2}>Scan QR Code</h2>
      <div>
        <input
          type='text'
          name='scanInput'
          value={scanInput}
          className={`${styles.field} ${styles.scanInput}`}
          onChange={(e) => setScanInput(e.target.value)}
          ref={scanInputRef}
        />
        {stageAddButtonEnabled ? (
          <button onClick={(e) => handleAddClick(e)}>Add</button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ScanInput;
