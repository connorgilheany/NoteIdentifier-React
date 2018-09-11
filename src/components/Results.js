import React, { Component } from 'react';
import SingleResult from './SingleResult';

class Results extends Component {

    getResultCells(resultArray) {
        let resultCells = resultArray.map( (result, index) => {
            return (
                <SingleResult key={index} result={result}/>
            )
        });
        return resultCells
    }

    render() {
        console.log(`Displaying results:\n${this.props.results}`);
        if(!this.props.results) {
            return (<div>First Game</div>);
        } else {
            return (
                <div>
                    {this.getResultCells(this.props.results)}
                </div>
            )
        }
    }
}

export default Results;
