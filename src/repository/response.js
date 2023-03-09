export default class RepositoryResponse {
    constructor() {
        
        this.byCondition = function () {
            return this.condition ? 
            {
            code: this.errCode,
            message: this.errMessage,
            info: this.info
            } : {
            code: null,
            message: null,
            info: this.info
            }
        }

        ////////////////////////////////////////

        this.direct = function (code, message) {
            return {
            code: code,
            message: message,
            info: this.info
            }
        }

        ////////////////////////////////////////

        this.continue = function () {
            return {
            code: null,
            message: null,
            info: this.info
            }
        }
    }
}