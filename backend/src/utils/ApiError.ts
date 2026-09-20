export class ApiError extends Error {
    constructor(
        public statuscode: number,

        message : string
    ){
        super(message)
        this.name = 'ApiError'
    }
}