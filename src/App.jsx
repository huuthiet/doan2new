import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Navbar from './components/navbar/Loadable';
import Footer from './components/footer/Loadable';

import Login from './containers/Login/Loadable';
import Register from './containers/Register/Loadable';
import ManagerEnergy from './containers/ManagerEnergy/Loadable';
import UserDasboardDetail from './containers/UserDasboardDetail/Loadable';
import AdminDasboardDetail from './containers/AdminDasboardDetail/Loadable';
import ManagerUser from './containers/ManagerUser';
import Profile from './containers/Profile';
import AdminRoute from './components/auth/AdminRoute';
// import RadialGaugeComponent from './components/gaugeMetter/Loadable';
import ElectricMetter from './components/ElectricMetter/Loadable';
import LineChart from './components/LineChart/Loadable';


import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
       <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>

        <Route element={<AdminRoute />}>
          <Route path='admin/manager-user' element={<ManagerUser />}/>
          <Route path='admin/manager-energy' element={<ManagerEnergy />}/>
          <Route path='/dashboard-detail/:id' element={<AdminDasboardDetail />}/>
        </Route>

        
        <Route path='/profile' element={<Profile />}/>

        <Route path='/user-dashboard-detail' element={<UserDasboardDetail />}/>
        <Route 
          path='/electric-metter' 
          element={<ElectricMetter />}
          />
        <Route 
          path='/line-chart' 
          element={<LineChart />}
          />
      </Routes>
      <Footer title="IOT" description="Chúng tôi rất hân hạnh được phát hành sản phẩm"/>
  </BrowserRouter>
  );
}

export default App;
