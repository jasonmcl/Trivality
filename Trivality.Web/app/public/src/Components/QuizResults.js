import React from 'react';
import {Row, Col, Button, Card} from 'antd';

function QuizResults(props) {
    return (
        <Row type="flex" justify="center">
            <Col span={12}>
                <Card>
                    <Row type="flex" justify="center">
                        <h3>Results - {props.score} / {props.total}</h3>
                    </Row>
                    <Row type="flex" justify="center">
                        <Button onClick={props.restartQuiz}>Take a new quiz</Button>
                        <Button onClick={props.saveResults}>Save Results</Button>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}

export default QuizResults;