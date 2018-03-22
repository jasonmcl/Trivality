import React from 'react';
import {Button, Row, Col} from "antd";
import './Question.css';

function unencode(str) {
    let patterns = [
        { 
            regex: /&ldquo;/g,
            replace: '"'
        },
        { 
            regex: /&rdquo;/g,
            replace: '"'
        },
        { 
            regex: /&#039;/g,
            replace: "'"
        },
        { 
            regex: /&quot;/g,
            replace: '"'
        },
        { 
            regex: /&Uuml;/g,
            replace: 'Ü'
        },
        {
            regex: /&scaron;/g,
            replace: 'š'
        },
        {
            regex: /&amp;/g,
            replace: '&'
        },
        {
            regex: /&shy;/g,
            replace: ''
        }
    ]
    for(let i = 0; i < patterns.length; i++) {
        str = str.replace(patterns[i].regex, patterns[i].replace);
    }

    return str;
}

function Question(props) {

    let answers = props.answers.map((ans, index) => {
        let cName = "btn-block"
        if(props.answerChosen) {
            if(ans.isCorrect) {
                cName += " ans-correct";
            }
            else {
                cName += " ans-wrong";
            }
        }
        return <Col key={index.toString()} span={11}>
            <Button onClick={()=>props.handleAnswerClick(ans.text)} className={cName}>{unencode(ans.text)}</Button>
        </Col>
    })

    return(
        <div>
            <Row type="flex" justify="center">
                <Col>
                    <h1>{unencode(props.question)}</h1>
                </Col>
            </Row>
            <Row type="flex" justify="space-around">
                {answers}
                {
                    props.answerChosen &&
                    <Col span={23}>
                        <Button onClick={props.nextQuestion} type="primary" className="float-right">Next Question</Button>
                    </Col>
                }
            </Row>
        </div>
    );
}

export default Question;