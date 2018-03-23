import React from 'react';
import {Row, Col, InputNumber, Select, Button, Card} from 'antd';
const Option = Select.Option;

class QuizForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numQuestions: 10,
            category: 'any',
            difficulty: 'any'
        }
    }

    handleChange = (val, name) => {
        this.setState({
            [name]: val
        });
    }

    render() {
        return(
            <div>
                <Row type="flex" justify="center">
                    <Col span={12}>
                        <Card className="quiz-form-card">
                        <label>Number of Questions:</label>
                        <InputNumber
                            value={this.state.numQuestions}
                            onChange={(val) => this.handleChange(val, 'numQuestions')}
                            style={{width: '100%'}}>
                        </InputNumber>
                        <label className="quiz-margin">Select a category: </label>                    
                        <Select 
                            onChange={(val) => this.handleChange(val, 'category')}  
                            defaultValue="any" 
                            className="form-control">
                            <Option value="any">Any Category</Option>
                            <Option value="9">General Knowledge</Option>
                            <Option value="27">Animals</Option>
                            <Option value="25">Art</Option>
                            <Option value="26">Celebrities</Option>
                            <Option value="22">Geography</Option>
                            <Option value="23">History</Option>
                            <Option value="20">Mythology</Option>
                            <Option value="24">Politics</Option>
                            <Option value="21">Sports</Option>
                            <Option value="28">Vehicles</Option>
                            <Option value="16">Entertainment: Board Games</Option>
                            <Option value="10">Entertainment: Books</Option>
                            <Option value="32">Entertainment: Cartoon &amp; Animations</Option>
                            <Option value="29">Entertainment: Comics</Option>
                            <Option value="11">Entertainment: Film</Option>
                            <Option value="31">Entertainment: Japanese Anime &amp; Manga</Option>
                            <Option value="12">Entertainment: Music</Option>
                            <Option value="13">Entertainment: Musicals &amp; Theatres</Option>
                            <Option value="14">Entertainment: Television</Option>
                            <Option value="15">Entertainment: Video Games</Option>
                            <Option value="17">Science &amp; Nature</Option>
                            <Option value="18">Science: Computers</Option>
                            <Option value="30">Science: Gadgets</Option>
                            <Option value="19">Science: Mathematics</Option>

                        </Select>
                        <label className="quiz-margin">Select a difficulty:</label>                    
                        <Select 
                            onChange={(val) => this.handleChange(val, 'difficulty')} 
                            defaultValue="any" 
                            className="form-control">
                            <Option value="any">Any Difficulty</Option>
                            <Option value="easy">Easy</Option>
                            <Option value="medium">Medium</Option>
                            <Option value="hard">Hard</Option>
                        </Select>
                        <Button 
                            onClick={() => this.props.startQuiz(this.state)} 
                            className="float-right quiz-margin" 
                            type="primary">Start Quiz
                        </Button>
                    </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default QuizForm;