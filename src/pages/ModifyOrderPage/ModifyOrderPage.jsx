import React, { useEffect, useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import styles from './ModifyOrderPage.module.css';
import { supabase } from '../../services/supabaseClient';
import { modifyColumnDefs } from '../../grid/modifyColumnDefs';

function ModifyOrderPage() {
  const [salesOrder, setSalesOrder] = useState('');
  const [loadedLineItems, setloadedLineItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      const { data, error } = await supabase.from('locations').select('*');
      if (error) {
        console.error('Error fetching locations:', error);
      } else {
        const sortedData = data.sort((a, b) =>
          a.location.localeCompare(b.location)
        );
        setLocations(sortedData);
      }
    };
    getLocations();
  }, []);

  const searchSalesOrderHandler = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq(
        'sales_order',
        salesOrder.length === 9 ? '0'.concat(salesOrder) : salesOrder
      )
      .eq('is_active', true);

    if (error) {
      console.log('Error fetching data: ', error);
    } else {
      // Add default flags to each row
      const flaggedData = data.map((row) => ({
        ...row,
        stagedForDelete: false,
        wasEdited: false,
      }));

      setloadedLineItems(flaggedData);
      setLoading(false);
    }
  };

  const handleDelete = (idToToggle) => {
    setloadedLineItems((prev) =>
      prev.map((row) =>
        row.id === idToToggle
          ? { ...row, stagedForDelete: !row.stagedForDelete }
          : row
      )
    );
  };

  const columnDefs = useMemo(
    () =>
      modifyColumnDefs.map((item, index) =>
        index === 9
          ? {
              ...item,
              editable: (params) => !params.data?.stagedForDelete,
              cellEditor: 'agSelectCellEditor',
              cellEditorParams: {
                values: locations.map((data) => data.location),
              },
            }
          : {
              ...item,
              editable: (params) => !params.data?.stagedForDelete,
            }
      ),
    [locations]
  );

  const handleSubmitChanges = async () => {
    const rowsToDelete = loadedLineItems.filter((row) => row.stagedForDelete);
    const rowsToUpdate = loadedLineItems.filter(
      (row) => !row.stagedForDelete && row.wasEdited
    );

    console.log('delete: ', rowsToDelete);
    console.log('update: ', rowsToUpdate);

    // DELETE staged rows
    if (rowsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from('orders')
        .delete()
        .in(
          'id',
          rowsToDelete.map((row) => row.id)
        );

      if (deleteError) {
        console.error('Delete error:', deleteError);
      } else {
        console.log('Rows deleted successfully.');
      }
    }

    // UPDATE edited rows
    for (const row of rowsToUpdate) {
      const { id, wasEdited, stagedForDelete, ...updateData } = row;

      const { error: updateError } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id);

      if (updateError) {
        console.error(`Update error for row ${id}:`, updateError);
      } else {
        console.log(`Row ${id} updated successfully.`);
      }
    }

    // Optional: Refresh data after submission
    searchSalesOrderHandler(); // Re-fetch the latest data
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Modify Order</h2>
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
          rowData={loadedLineItems}
          suppressMovableColumns={true}
          context={{ onDelete: handleDelete }}
          columnDefs={columnDefs}
          loading={loading}
          getRowStyle={(params) => {
            if (params.data?.stagedForDelete) {
              return {
                backgroundColor: '#ffecec',
                textDecoration: 'line-through',
                opacity: 0.6,
              };
            }
            return null;
          }}
          onCellValueChanged={(params) => {
            const updatedRow = { ...params.data, wasEdited: true };

            setloadedLineItems((prevRows) =>
              prevRows.map((row) =>
                row.id === updatedRow.id ? updatedRow : row
              )
            );
          }}
        />
        {loadedLineItems.length > 0 ? (
          <div className={styles.buttonContainer}>
            <button onClick={handleSubmitChanges}>Update</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ModifyOrderPage;
