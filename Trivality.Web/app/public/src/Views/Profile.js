import React from 'react';
import { Row, Col, Card, Divider, Button, Input, Upload, Icon } from 'antd';
import axios from 'axios';
import SavedResults from './SavedResults';
import '../Styles/Profile.css';
const { TextArea } = Input;

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountInfo:  {
                accountId: 1,
                picturePath: "",
                profilePicId: 1,
                description: ""
            },
            editing: false
        }
    }

    componentDidMount = () => {
        axios.get('/api/accounts/getprofile')
        .then(resp => {
            console.log("getprofile ", resp.data.item);
            this.setState({
                accountInfo: resp.data.item
            })
        });
    }

    updateProfile = () => {
        axios.post('/api/accounts/updateprofile', this.state.accountInfo)
        .then(resp => {
            console.log(resp);
            this.setState({
                accountInfo: resp.data.item
            })
        })
    }

    handleEditClick = () => {
        const editing = this.state.editing;

        if(editing) {
            this.updateProfile();
        }

        this.setState({
            editing: !editing
        })
    }

    handleChangePicture = (info) => {
        const file = info.file;
        console.log('file: ', file);

        var formdata = new FormData();
        formdata.append("file", file);

        axios.post("/api/files/upload", formdata)
        .then(resp => {
            console.log(resp);
            let accInfo = {...this.state.accountInfo}
            accInfo.profilePicId = resp.data.item;
            this.setState({
                accountInfo: accInfo
            }, ()=>this.updateProfile());
        });
    }

    handleDescriptionChange = (e) => {
        console.log(e.target);
        let accInfo = this.state.accountInfo;
        accInfo.description = e.target.value;
        this.setState({
            accountInfo: accInfo
        })
    }

    beforeUpload = file => {
        return false;
    }

    render() {
        const accountInfo = this.state.accountInfo;

        const ProfileTitle = (
            <div>
                <Row type="flex" justify="center">
                    <Col span={12}>
                        <img width='100%'
                            className="img-responsive" 
                            src= {accountInfo.picturePath || "http://laoblogger.com/images/default-profile-picture-5.jpg"}
                            alt="profile"
                        />
                    </Col>
                </Row>
                { this.state.editing && 
                    <div>
                        <br/>
                        <Row type="flex" justify="center">
                            <Col>
                                <Upload
                                    name= 'file'
                                    beforeUpload={()=>false}
                                    onChange={this.handleChangePicture}
                                    fileList = {[]}
                                >
                                    <Button><Icon type="upload" />Change Profile Picture</Button>
                                </Upload>
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        );

        return (
            <Row>
                <Col span={8}>
                    <Card
                        style={{margin: '5px'}}
                        title={ProfileTitle}>
                        {!this.state.editing ? 
                        <p className='wrap'>{this.state.accountInfo.description}</p>
                        :
                        <div>
                            <TextArea onChange={this.handleDescriptionChange} value={this.state.accountInfo.description.substr(0, 500)} rows={10} style={{resize: 'none'}}/>
                            <p>{this.state.accountInfo.description.length} / 500</p>
                        </div>
                        }
                        <Divider />
                        <Button className="float-right" onClick={this.handleEditClick}>Edit Profile</Button>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card title="Saved Quiz Results" style={{margin: '5px'}}>
                        <SavedResults/>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Profile;