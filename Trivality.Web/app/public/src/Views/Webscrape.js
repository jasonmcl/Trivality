import React from 'react';
import axios from 'axios';
import {Row, Col, Icon} from 'antd';
import Clue from '../Components/Clue';

class Webscrape extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clues: [],
            loading: true
        }
    }

    componentDidMount = () => {
        axios.get('/api/cotd/getclues')
        .then(resp => {
            console.log(resp.data.item);
            this.setState({
                clues: resp.data.item,
                loading: false
            })
        })
    }

    render() {
        let list = this.state.clues.map((clue, index) => {
            return(
                <Clue key={index} clue={clue}/>
            ); 
        });

        return(
            <div>
                <Row type="flex" justify="center">
                    <Col span={12}>
                        {
                            this.state.loading &&
                            <Icon style={{fontSize: '450pt'}} type="loading" />
                        }
                        {list}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Webscrape;