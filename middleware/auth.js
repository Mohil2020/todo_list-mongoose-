var jwt = require('jsonwebtoken');

exports.auth_check = (req,res,next) => {
    jwt.verify(req.headers.authorization,'token_key',next)
}