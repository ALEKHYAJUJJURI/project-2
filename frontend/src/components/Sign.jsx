import { Form, Input, Button } from 'antd'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export function Sign() {
    const navigate = useNavigate()
    function onFinish(values) {
        const { username, email, password } = values
        console.log(values.username)
        console.log('Submitting data to API:', { username, email, password });
        const response = axios.post('http://localhost:5002/api/signup', { username, email, password });
        console.log('API response:', response.data);
        navigate('/login');
    }
    return (
        <div className=''>
            <div className='primary'>Signup</div>
            <Form onFinish={onFinish} layout="vertical">

                <Form.Item label="User Name" name="username" rules={[{ required: true }]}>

                    <Input name='username' placeholder='User Name' />

                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true }]}>

                    <Input name="email" placeholder='Email' />

                </Form.Item>


                <Form.Item label="Password" name="password" rules={[{ required: true }]}>

                    <Input.Password name='password' placeholder='password' />
                   
                </Form.Item>

                <Button type="primary" htmlType="submit">

                    Sign Up

                </Button>

            </Form>

            
        </div>
    )
}