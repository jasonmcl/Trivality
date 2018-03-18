import React from 'react';
import {Form, Input, Icon} from 'antd';

function Register(props){
    const handleInputChange = (e) => {
        props.onInputChange(e, "regInfo");
    }

    return (
        <Form>
            <Form.Item>
                <Input 
                    value={props.formVal.email} 
                    onChange={handleInputChange} 
                    name="email" 
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />} 
                    placeholder="Email">
                </Input>
            </Form.Item>
            <Form.Item>
                <Input 
                    value={props.formVal.username} 
                    onChange={handleInputChange} 
                    name="username" 
                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}} />} 
                    placeholder="Username">
                </Input>
            </Form.Item>
            <Form.Item>
                <Input 
                    value={props.formVal.password} 
                    onChange={handleInputChange}
                    type="password"
                    name="password" 
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />} 
                    placeholder="Password">
                </Input>
            </Form.Item>
            <Form.Item>
                <Input 
                    value={props.formVal.confirmPass} 
                    onChange={handleInputChange}
                    type="password"
                    name="confirmPass" 
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />} 
                    placeholder="Confirm Password">
                </Input>
            </Form.Item>
        </Form>
        
    );
}

export default Register;