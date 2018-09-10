import React, { Component } from 'react';
import NoteRequestService from '../services/NoteRequestService'
import NoteComponent from './NoteComponent'

//The game gets the notes, plays them, and lets the user guess
/*
    Game flow: Start button saves options if they're different,
    Then gets notes. each note should have: an audio bubble on top, then a blank space to type your answer,
    And below the blank space should be buttons so that the user can click those if they want.
    Upon enter or tab, go to the next blank space, play the audio, show the buttons, etc
 */

class Game extends Component {
    constructor() {
        super();
        this.state = {
            sequenceLength: 4,
            currentSequenceID: '',
            noteURLs: []
        };
        this.onGameStart = this.onGameStart.bind(this);
    }

    async onGameStart(event) {
        console.log('Starting game...');
        //await this.props.beforeGameStart();
        console.log('Requesting notes...');
        this.getNotes()
    }

    getNotes() {
        let noteService = new NoteRequestService();
        noteService.getNotes().then(response => {
            console.log('response received');
            console.log(response);
            this.setState({
                currentSequenceID: response.data.sequenceID,
                noteURLs: response.data.notes
            })
        }).catch(err => {
            console.log('response error');
            console.error(err);
        })
    }

    isGameInProgress() {
        return this.state.currentSequenceID
    }

    startButton() {
        return (
          <button onClick={this.onGameStart}>
              Start Game
          </button>
        );
    }

    gameContent() {
        if(this.isGameInProgress()) {
            let noteViews = this.state.noteURLs.map( (url, index) => {
                return (<NoteComponent key={index} url={url}/>)
            });
            return <div>{noteViews}</div>
        } else {
            return this.startButton();
        }
    }

    render() {
        return (
            <div>
                <h2>Game</h2>
                {this.gameContent()}
            </div>
        );
    }
}

export default Game;
