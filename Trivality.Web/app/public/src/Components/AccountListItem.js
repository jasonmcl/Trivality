import React from 'react';
import {Button, Input} from 'antd';


class AccountListItem extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            user: {...props.acc},
            originalUser: {...props.acc}
        }
    }

    handleEditClick = () => {
        const editing = !this.state.editing;
        this.setState({
            editing: editing
        })
    }

    handleEdit = e => {
        let user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({
            user: user
        });
    }

    submitEdit = () => {
        const user = this.state.user;
        this.props.submitEdit(user);
        this.setState({
            originalUser: {...user},
            editing: false
        });
    }

    cancelEdit = () => {
        const origUser = this.state.originalUser;
        this.setState({
            user: origUser,
            editing: false
        });
    }

    render() {
        let user = this.state.user;
        let editableFields = (
            <React.Fragment>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.passwordHash}</td>
                {/* <td>{user.salt}</td> */}
            </React.Fragment>
        );
        if(this.state.editing) {
            editableFields = (
                <React.Fragment>
                    <td>{<Input onChange={this.handleEdit} name="username" value={user.username}></Input>}</td>
                    <td>{<Input onChange={this.handleEdit} name="email" value={user.email}></Input>}</td>
                    <td>{<Input onChange={this.handleEdit} name="passwordHash" value={user.passwordHash}></Input>}</td>
                    {/* <td>{<Input onChange={this.handleEdit} name="salt" value={user.salt}></Input>}</td> */}
                </React.Fragment>
            );
        }

        let buttons = (
            <React.Fragment>
                <td><Button onClick={this.handleEditClick}>Edit</Button></td>
                <td><Button onClick={() => this.props.onDeleteClick(user.id)} type="danger">Delete</Button></td>
            </React.Fragment>
        );
        if(this.state.editing) {
            buttons = (
                <React.Fragment>
                    <td><Button onClick={this.submitEdit}>Submit</Button></td>
                    <td><Button onClick={this.cancelEdit} type="danger">Cancel</Button></td>
                </React.Fragment>
            );
        }

        return (
            <tr>
                <td>{user.id}</td>
                {editableFields}
                <td>{user.createdDate}</td>
                <td>{user.modifiedDate}</td>
                <td>{user.modifiedBy}</td>
                {buttons}
            </tr>
        );
    }
}

export default AccountListItem;

/*
<tr>
                <td>{this.props.id}</td>
                <td>{this.props.username}</td>
                <td>{this.props.email}</td>
                <td>{this.props.passwordHash}</td>
                <td>{this.props.salt}</td>
                <td>{this.props.createdDate}</td>
                <td>{this.props.modifiedDate}</td>
                <td>{this.props.modifiedBy}</td>
                <td><Button>Edit</Button></td>
                <td><Button onClick={() => this.handleDeleteClick(this.props.id)} type="danger">Delete</Button></td>
            </tr>
*/