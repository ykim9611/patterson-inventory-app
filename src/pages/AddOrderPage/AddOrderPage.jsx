import React, { useState, useEffect, useRef, useMemo } from 'react';
import { supabase } from '../../services/supabaseClient';
import { AgGridReact } from 'ag-grid-react';
import { addColumnDefs } from '../../grid/addColumnDefs';
import { viewColumnDefs } from '../../grid/viewColumnDefs';
import OrderManualInputSection from '../../components/OrderManualInputSection/OrderManualInputSection';
import ScanInput from '../../components/ScanInput/ScanInput';
import styles from './AddOrderPage.module.css';
import { v4 as uuidv4 } from 'uuid';
import NewPartNumberModal from '../../components/NewPartNumberModal/NewPartNumberModal';

function AddOrderPage(props) {
  const [procurementSpecialists, setProcurementSpecialists] = useState([]);
  const [locations, setLocations] = useState([]);
  const [scanInput, setScanInput] = useState('');
  const [receivedDate, setReceivedDate] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    procurementSpecialist: '',
  });
  const [stagedOrders, setStagedOrders] = useState([]);
  const scanInputRef = useRef(null);

  const [submittedStatus, setSubmittedStatus] = useState(false);
  const [submittedOrders, setSubmittedOrders] = useState([]);

  const [stageAddButtonEnabled, setStageAddButtonEnabled] = useState(true);
  const [missingPartNumber, setMissingPartNumber] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getProcurementSpecialists = async () => {
      const { data, error } = await supabase
        .from('procurement_specialists')
        .select('*');
      if (error) {
        console.error('Error fetching procurement specialists:', error);
      } else {
        setProcurementSpecialists(data);
      }
    };

    const getToday = () => {
      const date = new Date().toISOString().split('T')[0];
      setReceivedDate(date);
    };

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

    getProcurementSpecialists();
    getToday();
    getLocations();
  }, []); // run once on mount only

  const columnDefs = useMemo(
    () =>
      addColumnDefs.map((item, index) =>
        index === 9
          ? {
              ...item,
              cellEditor: 'agSelectCellEditor',
              cellEditorParams: {
                values: locations.map((data) => data.location),
              },
              editable: true,
            }
          : item
      ),
    [locations]
  );

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const findPartDescription = async (partNumber) => {
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .eq('part_number', partNumber);

    if (error) {
      console.error('Error fetching parts:', error);
      return '';
    }

    if (!data || data.length === 0) {
      // Handle new part description logic if needed
      setMissingPartNumber(partNumber);
      setShowModal(true);
      return '';
    }

    return data[0].part_description || '';
  };

  const handleSaveDescription = (partNumber, description) => {
    setStagedOrders((prev) =>
      prev.map((item) =>
        item.part_number === partNumber
          ? { ...item, part_description: description }
          : item
      )
    );
  };

  const handleAddClick = async (e) => {
    e.preventDefault();
    if (!scanInput || scanInput.trim().length < 50) {
      // Prevent adding invalid scan input
      return;
    }
    const scan = scanInput;
    const partNumber = scan.slice(8, 18).trim();
    const partDescription = await findPartDescription(partNumber);
    const labelObject = {
      id: uuidv4(),
      qr_code: scan.trim(),
      customer_name: formData.customerName || '',
      procurement_specialist: formData.procurementSpecialist || '',
      received_date: receivedDate || '',
      part_number: partNumber,
      part_description: partDescription,
      order_type: scan.slice(18, 19).trim(),
      sales_order: scan.slice(19, 29).trim(),
      quantity: scan.slice(47, 49).trim(),
      box_number: scan.slice(49, 51).trim(),
      box_number_total: scan.slice(51, 53).trim(),
      serial_number: scan.slice(54).trim(),
      notes: '',
      location: '',
      storage: scan.slice(4, 8),
    };
    setStagedOrders((prevData) => [labelObject, ...prevData]);
    console.log(stagedOrders);
    setScanInput('');
    scanInputRef.current?.focus();
  };

  const submitStagedOrders = async () => {
    setLoading(true);
    const payload = stagedOrders.map((order) => ({
      id: order.id,
      qr_code: order.qr_code,
      customer_name: order.customer_name,
      procurement_specialist: order.procurement_specialist,
      received_date: order.received_date,
      part_number: order.part_number,
      part_description: order.part_description,
      order_type: order.order_type,
      sales_order: order.sales_order,
      quantity: order.quantity,
      box_number: order.box_number,
      box_number_total: order.box_number_total,
      serial_number: order.serial_number,
      notes: order.notes,
      location: order.location,
      storage: order.storage,
    }));
    const { data, error } = await supabase
      .from('orders')
      .insert(payload)
      .select();
    if (error) {
      console.error('Error submitting orders:', error);
      setLoading(false);
    } else {
      setStageAddButtonEnabled(false);
      setSubmittedStatus(true);
      setSubmittedOrders(data);
      setLoading(false);
    }
  };

  const handleDelete = (idToDelete) => {
    setStagedOrders((prev) => prev.filter((row) => row.id !== idToDelete));
    // Optionally delete from Supabase as well
  };

  const clearSubmittedOrders = () => {
    setStageAddButtonEnabled(true);
    setSubmittedStatus(false);
    setSubmittedOrders([]);
    setStagedOrders([]);
    scanInputRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Add Order</h2>
      <OrderManualInputSection
        formData={formData}
        receivedDate={receivedDate}
        onInputChange={handleOrderChange}
        onDateChange={setReceivedDate}
        procurementSpecialists={procurementSpecialists}
      />
      <ScanInput
        scanInput={scanInput}
        setScanInput={setScanInput}
        handleAddClick={handleAddClick}
        scanInputRef={scanInputRef}
        stageAddButtonEnabled={stageAddButtonEnabled}
      />
      <NewPartNumberModal
        show={showModal}
        setShow={setShowModal}
        partNumber={missingPartNumber}
        onSave={handleSaveDescription}
      />
      <div
        className='ag-theme-alpine'
        style={{ height: '50vh', width: '100%' }}
      >
        {!submittedStatus ? (
          <>
            <AgGridReact
              rowData={stagedOrders}
              suppressMovableColumns={true}
              loading={loading}
              columnDefs={columnDefs}
              // suppressNoRowsOverlay
              context={{ onDelete: handleDelete }}
              onCellValueChanged={(params) => {
                const updatedRow = params.data;
                const rowIndex = params.node.rowIndex;

                setStagedOrders((prevRows) => {
                  const newRows = [...prevRows];
                  newRows[rowIndex] = { ...updatedRow };
                  return newRows;
                });
              }}
            />
            {stagedOrders.length > 0 ? (
              <div className={styles.buttonContainer}>
                <button onClick={submitStagedOrders}>Submit</button>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <AgGridReact
              rowData={submittedOrders}
              suppressMovableColumns={true}
              loading={loading}
              columnDefs={viewColumnDefs}
            />
            <div className={styles.buttonContainer}>
              <button onClick={clearSubmittedOrders}>
                Clear and Add New Orders
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AddOrderPage;
