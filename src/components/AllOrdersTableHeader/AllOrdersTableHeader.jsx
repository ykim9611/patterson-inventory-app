import HeaderFilter from '../HeaderFilter/HeaderFilter';
import styles from './AllOrdersTableHeader.module.css';

function AllOrdersTableHeader({
  showDropdown,
  setShowDropdown,
  filterText,
  handleFilterChange,
  sortOrder,
  clearFilters,
  applyFilter,
  toggleSort,
}) {
  return (
    <thead>
      <tr>
        <th className={styles.tableCustomer}>
          <div className={styles.thWrapper}>
            <span>Customer</span>
            <HeaderFilter
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              filterText={filterText}
              handleFilterChange={handleFilterChange}
              sortOrder={sortOrder}
              clearFilters={clearFilters}
              applyFilter={applyFilter}
              toggleSort={toggleSort}
            />
          </div>
        </th>
        <th className={styles.tablePs}>
          <div className={styles.thWrapper}>
            <span>P.S</span>
            <HeaderFilter
              showDropdown={showDropdown}
              setShowDropdown={setShowDropdown}
              filterText={filterText}
              handleFilterChange={handleFilterChange}
              sortOrder={sortOrder}
              clearFilters={clearFilters}
              applyFilter={applyFilter}
              toggleSort={toggleSort}
            />
          </div>
        </th>
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

export default AllOrdersTableHeader;
