import BasicRequest from './BasicRequest'

class GuessSubmitService extends BasicRequest {
    constructor(notesToGuess, sequenceID) {
        super('POST', '/note/guess', {
            notes: notesToGuess,
            sequenceID: sequenceID
        });
    }

    getNotes() {
        return this.sendRequest()
    }
}

export default GuessSubmitService;