let axios = require('axios');

class BasicRequest {
    constructor(method, path, data) {
        this.url = `http://localhost:3000${path}`;
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