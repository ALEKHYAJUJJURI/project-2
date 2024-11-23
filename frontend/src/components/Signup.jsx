import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, Card, Typography,Select} from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, ClearOutlined} from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const {Option} = Select


const SignupForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()


  const onFinish = async (values) => {
    const { username, email, password,role } = values
    console.log(values)
       try{
        console.log(values.username)
        console.log('Submitting data to API:', { username, email, password,role });
        const response = await axios.post('http://localhost:5002/api/signup', { username, email, password,role });
        console.log('API response:', response.data);
        if(response.status === 400){
          alert("user already present in database. please login");
          navigate('/login');
        }
        navigate('/login');
       }catch(err){
        // nav
        console.log(err)
       }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: '400', boxShadow: '0 4px 8px rgba(0,45,0,0.5)'}}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24,color:'' }}>Sign Up</Title>
        <Form
          form={form}
          name="register"
          onFinish={onFinish} 
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} allowClear={<ClearOutlined/>} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} allowClear={<ClearOutlined/>} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            
          >
            <Input.Password prefix={<LockOutlined/>}   placeholder="Password" />
            </Form.Item>


<Form.Item
  name="role"
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
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('You should access the agree')),
              },
            ]}
          >
            <Checkbox>
              I agree
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Text style={{ display: 'block', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </Text>
        <br/>
        <Text><Link to="/">back to home</Link></Text>
      </Card>
    </div>
  );
};

export default SignupForm;

