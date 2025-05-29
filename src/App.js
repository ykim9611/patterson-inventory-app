import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NavBar from './NavBar';
import AddOrderPage from './AddOrderPage';
import ModifyOrderPage from './ModifyOrderPage';
import ViewAllOrderPage from './ViewAllOrderPage';
import InstallChecklistPage from './InstallChecklistPage';
import UpdateLocationPage from './UpdateLocationPage';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add-order' element={<AddOrderPage />} />
        <Route path='/modify-order' element={<ModifyOrderPage />} />
        <Route path='/view-all-order' element={<ViewAllOrderPage />} />
        <Route path='/install-checklist' element={<InstallChecklistPage />} />
        <Route path='/location-update' element={<UpdateLocationPage />} />
      </Routes>
    </>
  );
}

export default App;
