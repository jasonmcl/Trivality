import React from 'react';
import axios from 'axios';
import AccountListItem from '../Components/AccountListItem';

class AccountList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountList: []
        }
    }

    componentDidMount = () => {
        this.getList();
    }

    getList = () => {
        axios.get('/api/accounts')
        .then(resp => {
            this.setState({
                accountList: resp.data.item
            });
        })
    }

    handleDeleteClick = (id) => {
        axios.delete("/api/accounts/" + id)
        .then(resp => {
            this.getList();
        });
    }

    handleEditUser = (user) => {
        axios.put("/api/accounts/" + user.id, user)
        .then(resp => {
            this.getList();
        })
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            {/* <th>Salt</th> */}
                            <th>Created Date</th>
                            <th>Modified Date</th>
                            <th>Modified By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.accountList.map(acc => {
                                return (
                                    <AccountListItem submitEdit={this.handleEditUser} onDeleteClick={this.handleDeleteClick} key={acc.id} acc={acc}/>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AccountList;