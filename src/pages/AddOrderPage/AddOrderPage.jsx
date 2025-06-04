import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import styles from './AddOrderPage.module.css';
import OrdersTableHeader from '../../components/OrdersTableHeader/OrdersTableHeader';
import Table from 'react-bootstrap/Table';
import { v4 as uuidv4 } from 'uuid';
import StagedOrderRow from '../../components/StagedOrderRow/StagedOrderRow';
import OrderManualInputSection from '../../components/OrderManualInputSection/OrderManualInputSection';
import ScanInput from '../../components/ScanInput/ScanInput';
import SubmittedOrderRow from '../../components/SubmittedOrderRow/SubmittedOrderRow';

function AddOrderPage() {
  const [procurementSpecialists, setProcurementSpecialists] = useState([]);
  const [locations, setLocations] = useState([]);
  const [scanInput, setScanInput] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    procurementSpecialist: '',
  });
  const [stagedOrders, setStagedOrders] = useState([]);
  const [receivedDate, setReceivedDate] = useState();
  const [submitttedStatus, setSubmittedStatus] = useState(false);
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const scanInputRef = useRef(null);

  useEffect(() => {
    const getProcurementSpecialists = async () => {
      const { data, error } = await supabase
        .from('procurement_specialists')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setProcurementSpecialists(data);
      }
    };
    const getToday = () => {
      var date = new Date().toISOString().split('T')[0];
      setReceivedDate(date);
    };
    const getLocations = async () => {
      const { data, error } = await supabase.from('locations').select('*');
      const sortedData = data.sort((a, b) =>
        a.location.localeCompare(b.location)
      );
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setLocations(sortedData);
      }
    };
    getProcurementSpecialists();
    getToday();
    getLocations();
  }, []);

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddClick = async (e) => {
    e.preventDefault();
    if (!scanInput || scanInput.trim().length < 50) {
      //created to prevent issues when we scan without selecting an input.
      return;
    }
    var scan = scanInput;
    var partNumber = scan.slice(8, 18).trim();
    var partDescription = await findPartDescription(partNumber);
    var labelObject = {
      id: uuidv4(),
      qrCode: scan.trim(),
      customerName: formData.customerName || '',
      procurementSpecialist: formData.procurementSpecialist || '',
      receivedDate: receivedDate || '',
      partNumber,
      partDescription,
      orderType: scan.slice(18, 19).trim(),
      salesOrder: scan.slice(19, 29).trim(),
      quantity: scan.slice(47, 49).trim(),
      boxNumber: scan.slice(49, 51).trim(),
      boxNumberTotal: scan.slice(51, 53).trim(),
      serialNumber: scan.slice(54).trim(),
      notes: '',
      location: '',
    };
    setStagedOrders((prevData) => [...prevData, labelObject]);
    setScanInput('');
    scanInputRef.current?.focus();
  };

  const handleInputChange = (index, field, value) => {
    setStagedOrders((prevOrders) => {
      const updated = [...prevOrders];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const findPartDescription = async (partNumber) => {
    const { data, error } = await supabase
      .from('parts')
      .select('*')
      .eq('part_number', partNumber);

    var part = data;
    if (error) {
      console.error('Error fetching data:', error);
    } else if (part.length === 0) {
      //add new part description logic modal popup. and then assign the new description.
    }
    return part[0]?.part_description || '';
  };

  const submitStagedOrders = async () => {
    console.log('staged: ', stagedOrders);
    const payload = stagedOrders.map((order) => ({
      id: order.id,
      qr_code: order.qrCode,
      customer_name: order.customerName,
      procurement_specialist: order.procurementSpecialist,
      received_date: order.receivedDate,
      part_number: order.partNumber,
      part_description: order.partDescription,
      order_type: order.orderType,
      sales_order: order.salesOrder,
      quantity: order.quantity,
      box_number: order.boxNumber,
      box_number_total: order.boxNumberTotal,
      serial_number: order.serialNumber,
      notes: order.notes,
      location: order.location,
    }));
    const { data, error } = await supabase
      .from('orders')
      .insert(payload)
      .select(); // This returns the rows with the real Supabase-generated IDs
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      const submittedOrders = data.map((dataEntry) => ({
        id: dataEntry.id,
        qrCode: dataEntry.qr_code,
        customerName: dataEntry.customer_name,
        procurementSpecialist: dataEntry.procurement_specialist,
        receivedDate: dataEntry.received_date,
        partNumber: dataEntry.part_number,
        partDescription: dataEntry.part_description,
        orderType: dataEntry.order_type,
        salesOrder: dataEntry.sales_order,
        quantity: dataEntry.quantity,
        boxNumber: dataEntry.box_number,
        boxNumberTotal: dataEntry.box_number_total,
        serialNumber: dataEntry.serial_number,
        notes: dataEntry.notes,
        location: dataEntry.location,
      }));
      setSubmittedStatus(true);
      setSubmittedOrders(submittedOrders);
      console.log('submitted: ', submittedOrders);
    }
  };

  const clearSubmittedOrders = () => {
    setSubmittedStatus(false);
    setSubmittedOrders([]);
    setStagedOrders([]);
    scanInputRef.current?.focus();
  };

  return (
    <div className={styles.container}>
      <h2>Add Order</h2>
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
      />
      {!submitttedStatus ? (
        <div className={styles.stagedOrdersContainer}>
          <h2>Staged Orders</h2>
          <Table striped bordered hover responsive>
            <OrdersTableHeader />
            <tbody>
              {stagedOrders.length === 0 ? (
                <tr>
                  <td colSpan={12} className={styles.alternativeText}>
                    Add an order...
                  </td>
                </tr>
              ) : (
                <>
                  {stagedOrders.map((stagedOrder, index) => (
                    <StagedOrderRow
                      key={stagedOrder.id}
                      stagedOrder={stagedOrder}
                      index={index}
                      handleInputChange={handleInputChange}
                      locations={locations}
                      procurementSpecialists={procurementSpecialists}
                    />
                  ))}
                </>
              )}
            </tbody>
          </Table>
          <button onClick={submitStagedOrders}>Submit</button>
        </div>
      ) : (
        <div>
          <div className={styles.stagedOrdersContainer}>
            <h2>Submitted Orders</h2>
            <Table striped bordered hover responsive>
              <OrdersTableHeader />
              <tbody>
                {submittedOrders.map((submittedOrder, index) => (
                  <SubmittedOrderRow
                    key={submittedOrder.id}
                    submittedOrder={submittedOrder}
                  />
                ))}
              </tbody>
            </Table>
            <button onClick={clearSubmittedOrders}>
              Clear and Add New Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddOrderPage;
