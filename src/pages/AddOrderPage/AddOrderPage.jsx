import React, { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import styles from './AddOrderPage.module.css';
import OrdersTableHeader from '../../components/OrdersTableHeader/OrdersTableHeader';
import Table from 'react-bootstrap/Table';
import { v4 as uuidv4 } from 'uuid';

function AddOrderPage(props) {
  const [procurementSpecialists, setProcurementSpecialists] = useState([]);
  const [scanInput, setScanInput] = useState('');
  const [formData, setFormData] = useState({});
  const [stagedOrders, setStagedOrders] = useState([]);
  const [receivedDate, setReceivedDate] = useState();

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
    getProcurementSpecialists();
    getToday();
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
    };
    setStagedOrders((prevData) => [...prevData, labelObject]);
    setScanInput('');
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
    console.log(part[0]?.part_description || '');
    return part[0]?.part_description || '';
  };

  return (
    <div className={styles.container}>
      <h2>Add Order</h2>
      <div className={styles.manualEntryContainer}>
        <div>
          Customer:{' '}
          <input
            type='text'
            name='customerName'
            onChange={(e) => handleOrderChange(e)}
          />
        </div>
        <div>
          Procurement Specialist:{' '}
          <select
            name='procurementSpecialist'
            id=''
            onChange={(e) => handleOrderChange(e)}
          >
            <option value=''>Select a PS</option>
            {procurementSpecialists.map((procurementSpecialist) => {
              return (
                <option
                  key={procurementSpecialist.id}
                  value={procurementSpecialist.procurement_specialist}
                >
                  {procurementSpecialist.procurement_specialist}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          Received Date:{' '}
          <input
            type='date'
            value={receivedDate}
            onChange={(e) => setReceivedDate(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.scanContainer}>
        <h2>Scan QR Code</h2>
        <div>
          <input
            type='text'
            name='scanInput'
            value={scanInput}
            className={styles.scanInput}
            onChange={(e) => setScanInput(e.target.value)}
          />
          <button onClick={(e) => handleAddClick(e)}>Add</button>
        </div>
      </div>
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
                {stagedOrders.map((stagedOrder, index) => {
                  return (
                    <tr key={stagedOrder.id}>
                      <td>
                        <input
                          type='text'
                          value={stagedOrder.customerName}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'customerName',
                              e.target.value
                            )
                          }
                          className={styles.tableInput}
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          value={stagedOrder.procurementSpecialist}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'procurementSpecialist',
                              e.target.value
                            )
                          }
                          className={styles.tableInput}
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          value={stagedOrder.salesOrder}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'salesOrder',
                              e.target.value
                            )
                          }
                          className={styles.tableInput}
                        />
                      </td>
                      <td>
                        <input
                          type='date'
                          value={stagedOrder.receivedDate}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'receivedDate',
                              e.target.value
                            )
                          }
                          className={styles.tableInput}
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          value={stagedOrder.partNumber}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'partNumber',
                              e.target.value
                            )
                          }
                          className={styles.tableInput}
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          value={stagedOrder.partDescription || ''}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'partDescription',
                              e.target.value
                            )
                          }
                          className={styles.tableInput}
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          value={stagedOrder.serialNumber}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'serialNumber',
                              e.target.value
                            )
                          }
                          className={styles.tableInput}
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          value={stagedOrder.quantity}
                          onChange={(e) =>
                            handleInputChange(index, 'quantity', e.target.value)
                          }
                          className={styles.tableInput}
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          className={styles.tableBoxInput}
                          value={stagedOrder.boxNumber}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'boxNumber',
                              e.target.value
                            )
                          }
                        />{' '}
                        /{' '}
                        <input
                          type='text'
                          className={styles.tableBoxInput}
                          value={stagedOrder.boxNumberTotal}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              'boxNumberTotal',
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          value={stagedOrder.notes || ''}
                          onChange={(e) =>
                            handleInputChange(index, 'notes', e.target.value)
                          }
                          className={styles.tableInput}
                        />
                      </td>
                      <td>
                        <input
                          type='text'
                          value={stagedOrder.location || ''}
                          onChange={(e) =>
                            handleInputChange(index, 'location', e.target.value)
                          }
                          className={styles.tableInput}
                        />
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AddOrderPage;
