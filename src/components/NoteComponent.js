import React, { Component } from 'react';
import Sound from 'react-sound';


/*
    Each NoteComponent hosts the Note player and user input for one note.
 */
class NoteComponent extends Component {
    constructor() {
        super();
        this.state = {
            isPlaying: false,
            guessInput: ''
        };
        this.donePlayingSound = this.donePlayingSound.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.handleGuessInputChange = this.handleGuessInputChange.bind(this);
        this.guessSubmitted = this.guessSubmitted.bind(this);
    }

    donePlayingSound() {
        console.log(`Done playing ${this.props.url}`);
        this.setState({
            isPlaying: false
        })
    }

    playButton() {
        return (
            <button onClick={this.togglePlay}>
                {this.getPlayingStatusString()}
            </button>
        );
    }

    togglePlay() {
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    getPlayingStatusString() {
        return this.state.isPlaying ? "Note Playing..." : "Play Note"
    }

    //Returns the sound object with the correct playing status
    soundItem() {
        return (
            <Sound
                url={this.props.url}
                playStatus={this.state.isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
                autoLoad={true}
                onFinishedPlaying={this.donePlayingSound}
            />
        );
    }

    handleGuessInputChange(event) {
        this.setState({guessInput: event.target.value});
    }

    guessSubmitted(event) {
        // console.log(`Guessing ${this.state.guessInput} for note ${this.props.url}`);
        event.preventDefault();
        this.props.guessNote(this.state.guessInput);
    }

    guessBox() {
        return (
            <form onSubmit={this.guessSubmitted}>
                <label>
                    Note:
                    <input type="text" value={this.state.value} onChange={this.handleGuessInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }

    render() {
        return (
            <div>
                {this.playButton()}
                {this.soundItem()}
                {this.guessBox()}
            </div>
        );
    }
}

export default NoteComponent;
