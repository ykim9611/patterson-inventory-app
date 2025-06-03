import styles from './OrdersTableHeader.module.css';

function OrdersTableHeader() {
  return (
    <thead>
      <tr>
        <th className={styles.tableCustomer}>Customer</th>
        <th className={styles.tablePs}>P.S.</th>
        <th className={styles.tableSalesOrder}>SO#</th>
        <th className={styles.tableDate}>Date</th>
        <th className={styles.tableProductId}>Product#</th>
        <th className={styles.tableDesc}>Product Descr</th>
        <th className={styles.tableSerialNumber}>Serial#</th>
        <th className={styles.tableQuantity}>Qty</th>
        <th className={styles.tableBox}>Box</th>
        <th className={styles.tableNotes}>Notes</th>
        <th className={styles.tableLocation}>Location</th>
      </tr>
    </thead>
  );
}

export default OrdersTableHeader;
