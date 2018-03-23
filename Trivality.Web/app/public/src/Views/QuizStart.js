import React from 'react';
import axios from 'axios';
import {Button} from 'antd';
import Question from '../Components/Question';
import QuizForm from '../Components/QuizForm';
import QuizResults from '../Components/QuizResults';
import '../Styles/Quiz.css';

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
            console.log(resp.data);
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
                currAnswers: currAnswers,
                score: 0,
                currQuestion: 0
            })
        });
        this.setState({
            total: options.numQuestions,
            category: options.category,
            difficulty: options.difficulty
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

    saveResults = () => {
        let category = 'any';
        switch(this.state.category) {
            case "9": category = "General Knowledge";
                break;
            case "27": category = "Animals"; 
                break;
            case "25": category = "Art";
                break;
            case "26": category = "Celebrities";
                break;
            case "22": category = "Geography"
                break;
            case "23": category = "History"
                break;
            case "20": category = "Mythology"
                break;
            case "24": category = "Politics"
                break;
            case "21": category = "Sports"
                break;
            case "28": category = "Vehicles"
                break;
            case "16": category = "Entertainment: Board Games"
                break;
            case "10": category = "Entertainment: Books"
                break;
            case "32": category = "Entertainment: Cartoon &amp; Animations"
                break;
            case "29": category = "Entertainment: Comics"
                break;
            case "11": category = "Entertainment: Film"
                break;
            case "31": category = "Entertainment: Japanese Anime &amp; Manga"
                break;
            case "12": category = "Entertainment: Music"
                break;
            case "13": category = "Entertainment: Musicals &amp; Theatres"
                break;
            case "14": category = "Entertainment: Television"
                break;
            case "15": category = "Entertainment: Video Games"
                break;
            case "17": category = "Science &amp; Nature"
                break;
            case "18": category = "Science: Computers"
                break;
            case "30": category = "Science: Gadgets"
                break;
            case "19": category = "Science: Mathematics"
                break;
        }
        
        let data = {
            correct: this.state.score,
            total: this.state.total,
            category: category,
            difficulty: this.state.difficulty
        }
        axios.post('/api/scores', data)
        .then(resp => {
            console.log(resp);
        })
    }

    restartQuiz = () => {
        console.log("Restarting");
        this.setState({
            quizStarted: false,
            gameOver: false,
            ansChosen: false
        })
    }

    render() {
        return(
            <div className="quiz-margin">
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
                            </div>
                            :
                            <QuizResults restartQuiz={this.restartQuiz} score={this.state.score} total={this.state.total} saveResults={this.saveResults} />
                        }
                        </div>
                }
            </div>
        );
    }
}

export default QuizStart;