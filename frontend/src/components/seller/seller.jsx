import React from 'react';
import axios from 'axios';
import { Form, Input, Button,InputNumber } from 'antd';

import { useNavigate } from 'react-router-dom';



export function SellerDashboard(){
   
  
  const navigate = useNavigate()

  const handleUpload = async (values) => {
    console.log(values)
    const {name,description,price} = values
    
    try {
      const response = await axios.post('http://localhost:5002/api/products',{name,description,price});
      console.log('Product uploaded successfully!',response.data);

    } catch (error) {
      console.error('Error uploading product:', error);
      console.log('Failed to upload product. Please try again.');
    }
  };
    const handleLogout = () => {     
       navigate('/login')
      };
    return(
        <div>
           <div className="d-flex justify-content-between" style={{'backgroundColor':'#fdfddb'}}>
           <h4>Seller Dashboard</h4>
           <Button type="primary" onClick={handleLogout}>LogOut</Button>
           </div>
           <div className="d-flex w-50">
         <div>
         <h2>Upload Data</h2>
      <Form
        
        layout="vertical"
        onFinish={handleUpload}
      >
        
        <Form.Item
          label=" Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the name!' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        {/* Product Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter description!' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        {/* Product Price */}
        <Form.Item
          label="Number"
          name="price"
          rules={[{ required: true, message: 'Please enter number' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Enter product price"
            min={1}
            step={0.01}
          />
        </Form.Item>

     
        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Upload 
          </Button>
        </Form.Item>
      </Form>
         </div>
           </div>
        </div>
    )
}