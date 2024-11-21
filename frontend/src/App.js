import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { LoadingPage } from './components/InitialPage';
import { Sign } from './components/Sign';
import './App.css'
import 'antd/dist/reset.css'
import { SellerDashboard } from './components/seller/seller';
import { AdminDashboard } from './components/admin/admin';




function App() {
  return (
    <Router>
 
      <div className="App flex items-center justify-center" style={{'height':"100vh"}}>
       <Routes>
        <Route path='/' Component={LoadingPage}/>
        <Route path='/login' Component={Login}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/home' Component={Home} />
        <Route path='/sign' Component={Sign}/>
        <Route path='/seller' Component={SellerDashboard}/>
        <Route path='/admin' Component={AdminDashboard} />
       </Routes>
      </div>
    </Router>
  );
}

export default App;