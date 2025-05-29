import React, { useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

function AddOrderPage(props) {
  useEffect(() => {
    const fetchInventory = async () => {
      const { data, error } = await supabase
        .from('procurement_specialists')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Fetched data:', data);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className='page-container'>
      <h2>Add Orders</h2>
    </div>
  );
}

export default AddOrderPage;
