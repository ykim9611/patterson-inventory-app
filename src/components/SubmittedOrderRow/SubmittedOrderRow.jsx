// components/submittedOrderRow.jsx
import React from 'react';
import './SubmittedOrderRow.module.css'; // or reuse AddOrderPage.module.css

function SubmittedOrderRow({ submittedOrder }) {
  return (
    <tr>
      <td>
        <div type='text' value={submittedOrder.customerName}>
          {submittedOrder.customerName}
        </div>
      </td>
      <td>
        <div
          name='procurementSpecialist'
          value={submittedOrder.procurementSpecialist}
        >
          {submittedOrder.procurementSpecialist}
        </div>
      </td>
      <td>
        <div type='text' value={submittedOrder.salesOrder}>
          {submittedOrder.salesOrder}
        </div>
      </td>
      <td>
        <div type='date' value={submittedOrder.receivedDate}>
          {submittedOrder.receivedDate}
        </div>
      </td>
      <td>
        <div type='text' value={submittedOrder.partNumber}>
          {submittedOrder.partNumber}
        </div>
      </td>
      <td>
        <div type='text' value={submittedOrder.partDescription || ''}>
          {submittedOrder.partDescription || ''}
        </div>
      </td>
      <td>
        <div type='text' value={submittedOrder.serialNumber}>
          {submittedOrder.serialNumber}
        </div>
      </td>
      <td>
        <div type='text' value={submittedOrder.quantity}>
          {submittedOrder.quantity}
        </div>
      </td>
      <td>
        <div type='text' value={submittedOrder.boxNumber}>
          {submittedOrder.boxNumber} / {submittedOrder.boxNumberTotal}
        </div>
      </td>
      <td>
        <div type='text' value={submittedOrder.notes || ''}>
          {submittedOrder.notes || ''}
        </div>
      </td>
      <td>
        <div name='location' value={submittedOrder.location || ''}>
          {submittedOrder.location || ''}
        </div>
      </td>
    </tr>
  );
}

export default SubmittedOrderRow;
