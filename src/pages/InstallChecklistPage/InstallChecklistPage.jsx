import React, { useState } from 'react';
import styles from './InstallChecklistPage.module.css';
import { supabase } from '../../services/supabaseClient';
import { AgGridReact } from 'ag-grid-react';
import { viewColumnDefs } from '../../grid/viewColumnDefs';
import MyComponent from '../../components/MyComponent';

function InstallChecklistPage(props) {
  const [serviceOrderNumber, setServiceOrderNumber] = useState('');
  const [foundTiedOrders, setFoundTiedOrders] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchServiceOrder = () => {
    console.log(typeof serviceOrderNumber);
    const getTiedOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('install_number', serviceOrderNumber);
      // .order('sales_order', { ascending: false });
      if (error) {
        console.error('Error fetching data: ', error);
      } else {
        setFoundTiedOrders(true);
        setRowData(data);
        setLoading(true);
        console.log(data);
      }
    };
    getTiedOrders();
  };

  return (
    <div className={styles.container}>
      {!foundTiedOrders ? (
        <>
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
        </>
      ) : (
        <div
          className='ag-theme-alpine'
          style={{ height: '70vh', width: '100%' }}
        >
          <AgGridReact
            suppressMovableColumns={true}
            loading={loading}
            rowData={rowData}
            columnDefs={viewColumnDefs}
            enableCellTextSelection={true}
            pagination={true}
          />
          <MyComponent />
        </div>
      )}
    </div>
  );
}

export default InstallChecklistPage;
