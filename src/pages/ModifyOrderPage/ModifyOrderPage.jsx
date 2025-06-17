import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import styles from './ModifyOrderPage.module.css';
import { supabase } from '../../services/supabaseClient';
import { viewColumnDefs } from '../../grid/viewColumnDefs';
import { addColumnDefs } from '../../grid/addColumnDefs';

function ModifyOrderPage() {
  const [salesOrder, setSalesOrder] = useState('');
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSalesOrderHandler = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('sales_order', salesOrder)
      .eq('is_active', true);
    if (error) {
      console.log('Error fetching data: ', error);
    } else {
      setRowData(data);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Modify Order</h2>
      <div className={styles.inputContainer}>
        <span>Enter SO#: </span>
        <input type='text' onChange={(e) => setSalesOrder(e.target.value)} />
        <button onClick={searchSalesOrderHandler}>Search</button>
      </div>
      <div
        className='ag-theme-alpine'
        style={{ height: '49vh', width: '100%' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={addColumnDefs}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ModifyOrderPage;
