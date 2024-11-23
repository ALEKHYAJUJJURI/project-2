import React from 'react';
import axios from 'axios';
import { Form, Input, Button,InputNumber, Upload, message } from 'antd';

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
          label="Product Name"
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
          <Input.TextArea rows={4} placeholder="Enter product number" />
        </Form.Item>

        {/* Product Price */}
        <Form.Item
          label="price"
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
        <Form.Item 
        label="Product Image"
        name="image"
        rules={[
          {
            required:true,
            message:"provide the image"
          },
          {
            
          }
        ]}
        >
          <Upload  

          beforeUpload={(file)=>{
            return new Promise((res,rej)=>{
              if(file.size>3){
                rej("file size is not matching")
                message.error("File size exceed")
              } else{
                res('success')
              }
            })
          }}
          >
            <Button>Upload the picture</Button>
          </Upload>
        </Form.Item>

     
        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Upload Product 
          </Button>
        </Form.Item>
      </Form>
         </div>
           </div>
        </div>
    )
}