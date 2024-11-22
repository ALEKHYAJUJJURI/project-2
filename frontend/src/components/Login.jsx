import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import { LoginDetails } from './Signup';
import { Button, Card, Checkbox, Form, Input, Select } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text'
const { Option } = Select

function Login() {

  const navigate = useNavigate();





  function storeWithExpiry(key, value, expireSecs) {
    const expire = Date.now() + (expireSecs * 60 * 1000)

    localStorage.setItem(key, JSON.stringify({ value, expire }))
  }

  function getWithExpiry(key) {
    const storeData = localStorage.getItem(key)
    if (storeData) {
      const data = JSON.parse(storeData);
      if (data.expire > Date.now()) {
        return data.value

      }
      else {
        localStorage.removeItem(key)
        return null;
      }
    }
    return null
  }

  const handleFinish = async (values) => {
    const { email, password, role } = values;

    try {
      if (role === 'user') {
        // API call for user login
        const result = await axios.post('http://localhost:5002/api/login', { email, password });
        if (result.status === 200) {
          storeWithExpiry('accessToken', result.data.accessToken, 60 * 60); // 1 hour
          storeWithExpiry('refreshToken', result.data.refreshToken, 3 * 24 * 60 * 60); // 3 days
          navigate('/home');
          
        }
      } else if (role === 'seller') {
        // Navigate to seller dashboard
        navigate('/seller');
      } else if (role === 'admin') {
        // Navigate to admin dashboard
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login Failed. Please check your credentials.');
    }
  };


  return (
    <div className="">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

        <Card style={{ width: '400', boxShadow: '0 4px 6px rgba(0,0,0,0.4)' }}>

          <Title level={3} >Log In</Title>
          <Form onFinish={handleFinish}>
            <Form.Item
              label="Email"
              name='email'
              rules={[
                {
                  required: true,
                  message: "Email is required"
                },
                {
                  type: "email",
                  message: "Please enter valid Mail"
                }
              ]}
            >
              <Input placeholder='email' name='email' prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Password required'
                }
              ]}
            >
              <Input.Password placeholder='password' prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[
                {
                  required: true,
                  message: 'Please select a role!',
                },
              ]}
            >
              <Select placeholder="Select your role">
                <Option value="user">User</Option>
                <Option value="seller">Seller</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="confirm"
              valuePropName='checked'
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject("Please confirm")
                }
              ]}
            >
              <Checkbox>I Confirm</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' style={{ width: '100%' }}>Login</Button>
            </Form.Item>
            <Text>
              New User? <Link to='/signup'>Sign Up</Link>
            </Text >
            <br />
            <Text><Link to='/'>Back to Home</Link></Text>
          </Form>
        </Card>
      </div>

    </div>
  );
}

export default Login;