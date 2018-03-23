import React from 'react';
import {Table} from 'antd';
import axios from 'axios';

class SavedResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: []
        }
    }

    componentDidMount = () => {
        axios.get("/api/scores")
        .then(resp => {
            console.log(resp.data.item);
            let scores = resp.data.item.map((s, i) => {
                return {
                    key: i,
                    score: s.correct + " / " + s.total,
                    category: s.category,
                    difficulty: s.difficulty,
                    createdDate: s.createdDate.split("T")[0]
                }
            });
            
            this.setState({
                scores: scores
            })
        })
    }

    render(){
        
        const dataSource = this.state.scores;

        const columns = [{
            title: 'Score',
            dataIndex: 'score',
            key: 'score'
        }, {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        }, {
            title: 'Difficulty',
            dataIndex: 'difficulty',
            key: 'difficulty'
        }, {
            title: 'Date taken',
            dataIndex: 'createdDate',
            key: 'createdDate'
        }];

        return (
            <div>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
        );
    }
}

export default SavedResults;