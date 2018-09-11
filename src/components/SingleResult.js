import React, { Component } from 'react';

class SingleResult extends Component {
    getCongratulationsView() {
        if(this.props.result.isCorrect) {
            return (<p>Correct!</p>)
        } else {
            return (<p>Incorrect</p>)
        }
    }
    render() {
        return (
            <div>
                {this.getCongratulationsView()}
                Guessed {this.props.result.guessed}, Actual: {this.props.result.actual}
            </div>
        )
    }
}

export default SingleResult;
