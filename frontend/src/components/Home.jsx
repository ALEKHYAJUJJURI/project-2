import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'


function Home() {
  const [message, setMessage] = useState('');
  const navigate= useNavigate()

  
  useEffect(() => {

    
    const fetchProtectedData = async () => {
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken')
      if (!token || !refreshToken) {
     navigate('/login')
      }
      
      try {     
        const res = await axios.get('http://localhost:5002/api/protected',{
          headers: { Authorization: `Bearer ${token}` },
          withCredentials:true
        });
        navigate('/home')
        setMessage(res.data.message);
        console.log(res.data.message)
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
  }
  fetchProtectedData();
  
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <div className="">
    <nav className='bg-success d-flex justify-content-between p-2'>
      <h2 className='text-light'>Dashboard</h2>
      <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
    </nav>
    <main className='text-light'>
      <p>Welcome to dashboard</p>
      <p>{message}</p>
    </main>
    </div>
  );
}

export default Home;

