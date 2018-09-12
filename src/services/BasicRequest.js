let axios = require('axios');

let endpoint = 'https://k5wshsyz7l.execute-api.us-east-2.amazonaws.com/NoteIdentifier-v1';
let lhendpoint = 'http://localhost:3000';

class BasicRequest {
    constructor(method, path, data) {
        this.url = `${lhendpoint}${path}`;
        this.method = method;
        if(data) {
            this.data = data;
        }
    }

    sendRequest() {
        let options = {
            method: this.method,
            url: this.url,
            withCredentials: true
        };
        if(this.data) {
            options.data = this.data
        }
        return axios(options)
    }
}

export default BasicRequest;