const jwt = require("jsonwebtoken")

module.exports = checkAuth = request => {
    if (!request.headers.authorization) {
        return false
    }
    // if they do have an authentication token, verify authentication token validity
    const token = request.headers.authorization.split(" ") [1]
    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        // if it's not valid, return false
        if (err) {
            return false
        } 
        // if it is, return the data
        else {
            return data
        }
    });
    return loggedInUser;
}