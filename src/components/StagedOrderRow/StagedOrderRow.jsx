// components/StagedOrderRow.jsx
import React from 'react';
import styles from './StagedOrderRow.module.css'; // or reuse AddOrderPage.module.css

function StagedOrderRow({
  stagedOrder,
  index,
  handleInputChange,
  locations,
  procurementSpecialists,
}) {
  return (
    <tr>
      <td>
        <input
          type='text'
          value={stagedOrder.customerName}
          onChange={(e) =>
            handleInputChange(index, 'customerName', e.target.value)
          }
          className={styles.tableInput}
        />
      </td>
      <td>
        <select
          name='procurementSpecialist'
          value={stagedOrder.procurementSpecialist}
          onChange={(e) =>
            handleInputChange(index, 'procurementSpecialist', e.target.value)
          }
        >
          {procurementSpecialists.map((ps) => (
            <option key={ps.id} value={ps.procurement_specialist}>
              {ps.procurement_specialist}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type='text'
          value={stagedOrder.salesOrder}
          onChange={(e) =>
            handleInputChange(index, 'salesOrder', e.target.value)
          }
          className={styles.tableInput}
        />
      </td>
      <td>
        <input
          type='date'
          value={stagedOrder.receivedDate}
          onChange={(e) =>
            handleInputChange(index, 'receivedDate', e.target.value)
          }
          className={styles.tableInput}
        />
      </td>
      <td>
        <input
          type='text'
          value={stagedOrder.partNumber}
          onChange={(e) =>
            handleInputChange(index, 'partNumber', e.target.value)
          }
          className={styles.tableInput}
        />
      </td>
      <td>
        <input
          type='text'
          value={stagedOrder.partDescription || ''}
          onChange={(e) =>
            handleInputChange(index, 'partDescription', e.target.value)
          }
          className={styles.tableInput}
        />
      </td>
      <td>
        <input
          type='text'
          value={stagedOrder.serialNumber}
          onChange={(e) =>
            handleInputChange(index, 'serialNumber', e.target.value)
          }
          className={styles.tableInput}
        />
      </td>
      <td>
        <input
          type='text'
          value={stagedOrder.quantity}
          onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
          className={styles.tableInput}
        />
      </td>
      <td>
        <input
          type='text'
          className={styles.tableBoxInput}
          value={stagedOrder.boxNumber}
          onChange={(e) =>
            handleInputChange(index, 'boxNumber', e.target.value)
          }
        />{' '}
        /{' '}
        <input
          type='text'
          className={styles.tableBoxInput}
          value={stagedOrder.boxNumberTotal}
          onChange={(e) =>
            handleInputChange(index, 'boxNumberTotal', e.target.value)
          }
        />
      </td>
      <td>
        <input
          type='text'
          value={stagedOrder.notes || ''}
          onChange={(e) => handleInputChange(index, 'notes', e.target.value)}
          className={styles.tableInput}
        />
      </td>
      <td>
        <select
          name='location'
          value={stagedOrder.location || ''}
          onChange={(e) => handleInputChange(index, 'location', e.target.value)}
        >
          <option value=''>Select a Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.location}>
              {location.location}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}

export default StagedOrderRow;
