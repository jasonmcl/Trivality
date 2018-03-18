import React from 'react';
import { Row, Col, Card } from 'antd';

class Profile extends React.Component {
    render() {

        const ProfileTitle = (
            <Row>
                <Col span={8} offset={6}>
                    <img 
                        className="img-responsive" 
                        src="https://texasbarblog.lexblogplatformtwo.com/files/2011/12/housto-bankruptcy-attorney-adam-schachter1.jpg" 
                        alt="profile"
                    />
                </Col>
            </Row>
        );

        return (
            <Row>
                <Col span={8}>
                    <Card
                        style={{margin: '5px'}}
                        bordered={false} 
                        title={ProfileTitle}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam odio justo, rhoncus vitae orci quis, dignissim pharetra lacus. Duis vehicula suscipit justo, et mattis ante efficitur non. Vivamus ultrices, lorem ut malesuada vulputate, tortor mauris eleifend eros, sit amet viverra ante dolor ut ligula. Ut fringilla lectus lectus, sed bibendum tellus vulputate ut. Fusce ornare leo sit amet dui sagittis auctor. Integer dapibus pellentesque dui quis dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed nec velit a eros aliquet iaculis. Pellentesque sagittis lacinia molestie. Nunc massa lacus, iaculis ut risus non, efficitur gravida justo. Nullam vestibulum in tortor rutrum auctor. Vivamus et ligula tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis egestas tellus felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tincidunt nunc non libero volutpat rhoncus.</p>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Profile;