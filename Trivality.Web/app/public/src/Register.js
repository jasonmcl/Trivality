import React from 'react';
import axios from 'axios';

class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPass: ""
        }
    }

    handleInputChange = (e) => {
        let name = e.target.name;
        let val = e.target.value;
        this.setState({
            [name]: val
        });
    }

    handleSubmit = () => {
        console.log("State: ", this.state);
        axios.post('http://localhost:60080/api/accounts', {...this.state})
        .then(resp => {
            console.log(resp)
        })
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="form-group">
                        <label className="">Email</label>
                        <input value={this.state.email} onChange={this.handleInputChange} name="email" className="form-control" type="email" />
                    </div>
                    <div className="form-group">
                        <label className="">User Name</label>
                        <input value={this.state.username} onChange={this.handleInputChange} name="username" className="form-control" type="text" />
                    </div>
                    <div className="form-group">
                        <label className="">Password</label>
                        <input value={this.state.password} onChange={this.handleInputChange} name="password" className="form-control" type="password" />
                    </div>
                    <div className="form-group">
                        <label className="">Confirm Password</label>
                        <input value={this.state.confirmPass} onChange={this.handleInputChange} name="confirmPass" className="form-control" type="password" />
                    </div>
                    <button onClick={this.handleSubmit} className="btn btn-primary float-right">
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default Register;