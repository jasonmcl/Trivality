import React from 'react';
import axios from 'axios';

class AccountList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountList: []
        }
    }

    componentDidMount = () => {
        axios.get('/api/accounts')
        .then(resp => {
            this.setState({
                accountList: resp.data.item
            });
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
                            <th>Created Date</th>
                            <th>Modified Date</th>
                            <th>Modified By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.accountList.map(acc => {
                                return (
                                    <tr key={acc.id}>
                                        <td>{acc.id}</td>
                                        <td>{acc.username}</td>
                                        <td>{acc.email}</td>
                                        <td>{acc.createdDate}</td>
                                        <td>{acc.modifiedDate}</td>
                                        <td>{acc.modifiedBy}</td>
                                    </tr>
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