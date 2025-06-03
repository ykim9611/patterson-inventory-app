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
        <input type='text' name='customerName' onChange={onInputChange} />
      </div>
      <div>
        Procurement Specialist:{' '}
        <select name='procurementSpecialist' onChange={onInputChange}>
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
          value={receivedDate}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default OrderManualInputSection;
