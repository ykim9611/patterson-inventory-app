import styles from './OrderManualInputSection.module.css';

// components/OrderFormInputs.jsx
function OrderManualInputSection({
  formData,
  receivedDate,
  onInputChange,
  onDateChange,
  procurementSpecialists,
}) {
  return (
    <div className={styles.manualEntryContainer}>
      <div>
        Customer:{' '}
        <input
          type='text'
          name='customerName'
          value={formData.customerName}
          onChange={onInputChange}
          className={`${styles.field}`}
        />
      </div>
      <div>
        Procurement Specialist:{' '}
        <select
          name='procurementSpecialist'
          value={formData.procurementSpecialist}
          onChange={onInputChange}
          className={`${styles.field}`}
        >
          <option value=''>Select a PS</option>
          {procurementSpecialists.map((ps) => (
            <option key={ps.id} value={ps.procurement_specialist}>
              {ps.procurement_specialist}
            </option>
          ))}
        </select>
      </div>
      <div>
        Received Date:{' '}
        <input
          type='date'
          value={receivedDate || ''}
          onChange={(e) => onDateChange(e.target.value)}
          className={`${styles.field}`}
        />
      </div>
    </div>
  );
}

export default OrderManualInputSection;
