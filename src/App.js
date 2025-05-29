import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar/NavBar';
import AddOrderPage from './pages/AddOrderPage';
import ModifyOrderPage from './pages/ModifyOrderPage';
import ViewAllOrderPage from './pages/ViewAllOrderPage';
import InstallChecklistPage from './pages/InstallChecklistPage';
import UpdateLocationPage from './pages/UpdateLocationPage';
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
