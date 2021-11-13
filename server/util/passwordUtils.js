const crypto = require('crypto');
require('dotenv').config() ; 

function validPassword(password, hash) {
    var hashVerify = crypto.pbkdf2Sync(password, process.env.SALT, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

function genPassword(password) {
    var salt = process.env.SALT ; 
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return genHash;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;