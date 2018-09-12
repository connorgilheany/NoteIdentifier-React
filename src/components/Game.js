import React, { Component } from 'react';
import NoteRequestService from '../services/NoteRequestService'
import GuessSubmitService from '../services/GuessSubmitService'
import NoteComponent from './NoteComponent'
import Results from './Results'

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
            sequenceLength: 3,
            currentSequenceID: '',
            noteURLs: [],
            guessesToSubmit: [],
            lastResults: null
        };
    }

    onGameStart = async (event) => {
        console.log('Starting game...');
        //await this.props.beforeGameStart();
        console.log('Requesting notes...');
        this.getNotes()
    };

    getNotes() {
        let noteService = new NoteRequestService(this.state.sequenceLength);
        noteService.getNotes().then(response => {
            console.log('response received');
            console.log(response);
            this.setState({
                currentSequenceID: response.data.sequenceID,
                noteURLs: response.data.notes,
                guessesToSubmit: response.data.notes.map(() => '')
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

    submitGuessesButton() {
        return (
            <button onClick={this.submitGuesses}>Submit Guesses</button>
        )
    }

    submitGuesses = () => {
        console.log(`Submitting guesses: ${this.state.guessesToSubmit}`);
        let guessSubmit = new GuessSubmitService(this.state.guessesToSubmit, this.state.currentSequenceID);
        guessSubmit.sendRequest().then(response => {
            this.setState({
                currentSequenceID: '',
                lastResults: response.data,
                noteURLs: [],
                guessesToSubmit: []
            })
        })
    };

    guessReceivedForNote(index, note) {
        console.log(`Guessing note: ${note} for index: ${index}`);
        let guessesToSubmit = this.state.guessesToSubmit;
        guessesToSubmit[index] = note;
        this.setState({
            guessesToSubmit: guessesToSubmit
        })
    }

    gameContent() {
        if(this.isGameInProgress()) {
            let noteViews = this.state.noteURLs.map( (url, index) => {
                return (
                    <NoteComponent key={index} url={url}
                        guessNote={(note) => this.guessReceivedForNote(index, note)}
                    />)
            });
            return (
                <div>
                    {noteViews}
                    {this.submitGuessesButton()}
                    </div>
                    )
        } else {
            return (
                <div>
                    <Results results={this.state.lastResults}/>
                    {this.startButton()}
                </div>
            )
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
