import DeleteOrderButton from '../components/DeleteOrderButton/DeleteOrderButton';

export const addColumnDefs = [
  {
    field: 'customer_name',
    headerName: 'Customer',
    filter: true,
    flex: 1.3,
    sortable: false,
    editable: true,
    cellStyle: (params) => ({
      backgroundColor: params.value.length > 0 ? '' : '#f8d7da', // green or red
    }),
  },
  {
    field: 'procurement_specialist',
    headerName: 'P.S.',
    sortable: false,
    flex: 0.6,
    cellStyle: { textAlign: 'center' },
    editable: true,
  },
  {
    field: 'sales_order',
    headerName: 'SO#',
    filter: true,
    flex: 1.16,
    sortable: false,
    editable: true,
    cellStyle: (params) => ({
      backgroundColor: params.value.length > 0 ? '' : '#f8d7da', // green or red
    }),
  },
  {
    field: 'received_date',
    headerName: 'Date',
    filter: true,
    flex: 1.14,
    sortable: false,
    editable: true,
  },
  {
    field: 'part_number',
    headerName: 'Part#',
    filter: true,
    flex: 1.02,
    sortable: false,
    editable: true,
  },
  {
    field: 'part_description',
    headerName: 'Part Descr.',
    filter: true,
    sortable: false,
    flex: 2,
    editable: true,
  },
  {
    field: 'serial_number',
    headerName: 'Serial#',
    filter: true,
    flex: 1,
    sortable: false,
    editable: true,
  },
  {
    field: 'quantity',
    headerName: 'Qty',
    sortable: false,
    flex: 0.61,
    cellStyle: { textAlign: 'center' },
    editable: true,
  },
  {
    valueGetter: (params) =>
      `${params.data.box_number} / ${params.data.box_number_total}`,
    headerName: 'Box',
    sortable: false,
    flex: 0.64,
    cellStyle: { textAlign: 'center' },
    editable: true,
  },
  {
    field: 'location',
    headerName: 'Location',
    filter: false,
    flex: 1.28,
    sortable: false,
    editable: true,
    cellStyle: (params) => ({
      backgroundColor: params.value.length > 0 ? '' : '#f8d7da', // green or red
    }),
  },
  {
    field: 'notes',
    headerName: 'Notes',
    filter: false,
    flex: 1,
    sortable: false,
    editable: true,
  },
  {
    field: 'delete',
    headerName: '',
    filter: false,
    flex: 0.6,
    sortable: false,
    editable: false,
    cellRenderer: DeleteOrderButton,
    cellStyle: { cursor: 'pointer', textAlign: 'center' },
  },
];
