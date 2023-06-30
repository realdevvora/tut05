// CROSS ORIGIN RESOURCE SHARING
const whitelist = ["https://127.0.0.1:5500", "https://localhost:3500"]
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            // callback -> allow get request
            callback(null, true)
        }
        else {
            // cancel get request
            callback(new Error("not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions