import BasicRequest from './BasicRequest'

class NoteRequestService extends BasicRequest {
    constructor(size) {
        super('GET', `/note/sequence?size=${size}`);
    }

    getNotes() {
        return this.sendRequest()
    }
}

export default NoteRequestService;