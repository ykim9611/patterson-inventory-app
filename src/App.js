import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar/NavBar';
import AddOrderPage from './pages/AddOrderPage/AddOrderPage';
import ModifyOrderPage from './pages/ModifyOrderPage/ModifyOrderPage';
import ViewAllOpenOrdersPage from './pages/ViewAllOpenOrdersPage/ViewAllOpenOrdersPage';
import InstallChecklistPage from './pages/InstallChecklistPage';
import UpdateLocationPage from './pages/UpdateLocationPage';
import PageWrapper from './components/PageWrapper/PageWrapper';

function App() {
  return (
    <>
      <NavBar />
      <PageWrapper>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/add-order' element={<AddOrderPage />} />
          <Route path='/modify-order' element={<ModifyOrderPage />} />
          <Route path='/view-all-order' element={<ViewAllOpenOrdersPage />} />
          <Route path='/install-checklist' element={<InstallChecklistPage />} />
          <Route path='/location-update' element={<UpdateLocationPage />} />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;
