import React from 'react';
import {Card, Divider, Button} from 'antd';

class Clue extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }

    handleClick = () => {
        let hidden = !this.state.hidden;
        this.setState({
            hidden: hidden
        })
    }

    render(){
        return(
            <Card>
                <h5>{this.props.clue.question}</h5>
                <Divider />
                { !this.state.hidden &&
                    <p>{this.props.clue.answer}</p>
                }
                <Button onClick={this.handleClick}>Toggle Answer</Button>
            </Card>
        );
    }
}

export default Clue;