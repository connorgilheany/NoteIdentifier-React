import React, { Component } from 'react';

/*
    Each NoteComponent hosts the Note player and user input for one note.
 */
class NoteComponent extends Component {
    render() {
        return (
            <p>{this.props.url}</p>
        );
    }
}

export default NoteComponent;
