import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { AgGridReact } from 'ag-grid-react';
import styles from './ViewAllOrderPage.module.css';
import { viewColumnDefs } from '../../grid/viewColumnDefs';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

function ViewAllOrderPage(props) {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllorders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('is_active', true);
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log(data);
        setRowData(data);
        setLoading(false);
      }
    };
    getAllorders();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.h2}>View All Orders</h2>
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
      </div>
    </div>
  );
}

export default ViewAllOrderPage;

/*-----------Infinite Version-----------------------*/

// import React, { useRef } from 'react';
// import { supabase } from '../../services/supabaseClient';
// import { AgGridReact } from 'ag-grid-react';
// import styles from './ViewAllOrderPage.module.css';
// import {
//   ModuleRegistry,
//   ClientSideRowModelModule,
//   InfiniteRowModelModule,
// } from 'ag-grid-community';

// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// ModuleRegistry.registerModules([
//   ClientSideRowModelModule,
//   InfiniteRowModelModule,
// ]);

// function ViewAllOrderPage() {
//   const gridRef = useRef();

//   const columnDefs = [
//     {
//       field: 'customer_name',
//       headerName: 'Customer',
//       filter: true,
//       flex: 1.3,
//       sortable: false,
//     },
//     {
//       field: 'procurement_specialist',
//       headerName: 'P.S.',
//       sortable: false,
//       flex: 0.6,
//       cellStyle: { textAlign: 'center' },
//     },
//     {
//       field: 'sales_order',
//       headerName: 'SO#',
//       filter: true,
//       flex: 1.16,
//       sortable: false,
//     },
//     {
//       field: 'received_date',
//       headerName: 'Date',
//       filter: true,
//       flex: 1.14,
//       sortable: false,
//     },
//     {
//       field: 'part_number',
//       headerName: 'Part#',
//       filter: true,
//       flex: 1.02,
//       sortable: false,
//     },
//     {
//       field: 'part_description',
//       headerName: 'Part Descr.',
//       filter: true,
//       sortable: false,
//       flex: 2,
//     },
//     {
//       field: 'serial_number',
//       headerName: 'Serial#',
//       filter: true,
//       flex: 1,
//       sortable: false,
//     },
//     {
//       field: 'quantity',
//       headerName: 'Qty',
//       sortable: false,
//       flex: 0.61,
//       cellStyle: { textAlign: 'center' },
//     },
//     {
//       valueGetter: (params) => {
//         if (!params.data) return '';
//         return `${params.data.box_number} / ${params.data.box_number_total}`;
//       },
//       headerName: 'Box',
//       sortable: false,
//       flex: 0.64,
//       cellStyle: { textAlign: 'center' },
//     },
//     {
//       field: 'location',
//       headerName: 'Location',
//       filter: false,
//       flex: 1.28,
//       sortable: false,
//     },
//     {
//       field: 'notes',
//       headerName: 'Notes',
//       filter: false,
//       flex: 1,
//       sortable: false,
//     },
//   ];

//   const datasource = {
//     getRows: async (params) => {
//       const { startRow, endRow } = params; // AG Grid Community gives these as top-level props

//       try {
//         // Supabase uses zero-based range, endRow is inclusive
//         const { data, error, count } = await supabase
//           .from('orders')
//           .select('*', { count: 'exact' })
//           .range(startRow, endRow - 1); // endRow is exclusive, so subtract 1

//         if (error) {
//           console.error('Error fetching data:', error);
//           params.failCallback();
//           return;
//         }

//         const lastRow = count <= endRow ? count : -1;

//         params.successCallback(data, lastRow);
//       } catch (err) {
//         console.error('Error in datasource getRows:', err);
//         params.failCallback();
//       }
//     },
//   };

//   return (
//     <div className={styles.mainContainer}>
//       <h2 className={styles.h2}>View All Orders</h2>
//       <div
//         className='ag-theme-alpine'
//         style={{ height: '70vh', width: '100%' }}
//       >
//         <AgGridReact
//           ref={gridRef}
//           columnDefs={columnDefs}
//           rowModelType='infinite'
//           cacheBlockSize={100}
//           maxBlocksInCache={10}
//           datasource={datasource}
//           enableCellTextSelection={true}
//           theme='ag-theme-alpine'
//         />
//       </div>
//     </div>
//   );
// }

// export default ViewAllOrderPage;
