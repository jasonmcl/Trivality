import React from 'react';
import axios from 'axios';
import {Button} from 'antd';
import Question from '../../Components/Question';
import QuizForm from '../../Components/QuizForm';

class QuizStart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            quizStarted: false,
            questions: [],
            currQuestion: 0,
            currAnswers: [],
            ansChosen: false,
            score: 0,
            gameOver: false
        }
    }

    startQuiz = (options) => {
        let triviaUrl = 'https://opentdb.com/api.php?';
        triviaUrl += 'amount=' + options.numQuestions;
        if(options.category !== 'any')
            triviaUrl += '&category=' + options.category;
        if(options.difficulty !== 'any')
            triviaUrl += '&difficulty=' + options.difficulty;
        triviaUrl += '&type=multiple';
        axios.get(triviaUrl)
        .then(resp => {
            let result = resp.data.results;
            let currAnswers = this.shuffleAnswers([
                {
                    text: result[0].correct_answer,
                    isCorrect: true
                },
                {
                    text: result[0].incorrect_answers[0],
                    isCorrect: false
                },
                {
                    text: result[0].incorrect_answers[1],
                    isCorrect: false
                },
                {
                    text: result[0].incorrect_answers[2],
                    isCorrect: false
                },
            ])

            this.setState({
                quizStarted: true,
                questions: result,
                currAnswers: currAnswers
            })
        })
    }

    handleAnswerClick = ans => {
        if(this.state.ansChosen) {
            return;
        }
        let correct = this.state.questions[this.state.currQuestion].correct_answer;
        let score = this.state.score;
        if(ans === correct){
            console.log("correct");
            score += 1;
        }
        else {
            console.log("incorrect, correct answer is", correct);
        }
        this.setState({
            ansChosen: true,
            score: score
        });
    }

    shuffleAnswers = list => {
        var m = list.length, t, i;

        while(m) {
            i = Math.floor(Math.random() * m--);
            t = list[m];
            list[m] = list[i];
            list[i] = t;
        }
        return list;
    }

    handleNextQuestion = () => {
        let nextQ = this.state.currQuestion + 1;
        if(nextQ >= this.state.questions.length) {
            this.setState({gameOver: true});
            return;
        }
        let nextA = this.shuffleAnswers([
            {
                text: this.state.questions[nextQ].correct_answer, 
                isCorrect: true
            },
            {
                text: this.state.questions[nextQ].incorrect_answers[0], 
                isCorrect: false
            },
            {
                text: this.state.questions[nextQ].incorrect_answers[1], 
                isCorrect: false
            },
            {
                text: this.state.questions[nextQ].incorrect_answers[2], 
                isCorrect: false
            }
        ]);
        this.setState({
            currQuestion: nextQ,
            currAnswers: nextA,
            ansChosen: false,
        })
    }

    render() {
        return(
            <div>
                {
                    !this.state.quizStarted ?
                        <QuizForm startQuiz={this.startQuiz} />
                    :
                        <div>
                        {
                            !this.state.gameOver ?
                            <div>
                                <Question 
                                    question={this.state.questions[this.state.currQuestion].question} 
                                    answers={this.state.currAnswers} 
                                    handleAnswerClick={this.handleAnswerClick}
                                    answerChosen={this.state.ansChosen}
                                    nextQuestion={this.handleNextQuestion}/>
                                <p style={{marginLeft: '25px'}}>{this.state.score} / {this.state.currQuestion}</p>
                            </div>
                            :
                            <div>
                                <h3>Results - {this.state.score} / {this.state.questions.length}</h3>
                                <Button>Save Results</Button>
                            </div>
                        }
                        </div>
                }
            </div>
        );
    }
}

export default QuizStart;