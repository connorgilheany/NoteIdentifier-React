import BasicRequest from './BasicRequest'

class GuessSubmitService extends BasicRequest {
    constructor() {
        // super('GET', '/note/sequence?size=4');
    }

    getNotes() {
        return this.sendRequest()
    }
}

export default GuessSubmitService;