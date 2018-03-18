import React from 'react';
import {Form, Input, Icon} from 'antd';

function Login(props) {
    const handleInputChange = (e) => {
        props.onInputChange(e, "loginInfo");
    }
    return (
        <Form>
            <Form.Item>
                <Input 
                    value={props.formVal.username} 
                    onChange={handleInputChange} 
                    name="username" 
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />} 
                    placeholder="Username or Email">
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
        </Form>
    );
}

export default Login;

/*
<div className="row">
            <div className="col-12">
                <div className="form-group">
                    <label className="">Username or Email</label>
                    <input value={props.formVal.username} onChange={handleInputChange} name="username" className="form-control" type="text" />
                </div>
                <div className="form-group">
                    <label className="">Password</label>
                    <input value={props.formVal.password} onChange={handleInputChange} name="password" className="form-control" type="password" />
                </div>
            </div>
        </div>
*/