import React, { Component } from 'react';
import Game from './Game';

//The main content will house the game, options, etc. depending on the context
//Note options on the left, game on the right
class MainContent extends Component {
    render() {
        return (
            <Game beforeGameStart={console.log('MainContent.beforeGameStart done')}/>
        );
    }
}

export default MainContent;
