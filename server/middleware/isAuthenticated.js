const jwt = require('jsonwebtoken');

const User = require('../models/userModel')

const isAuthenticated = (req , res , next ) => {
    try {
        const token = req.headers.authorization.split(" ")[1] ;
        
        if(!token){   
            return res.status(403).send({err : "user not authenticated "})
        }
        
        const isCustomAuth = token.length < 500 ; 
        
        let decodedData ; 
        
        if(token && isCustomAuth){
            try {
                decodedData = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET )  ;
                req.userId = decodedData?.id ; 
                next() ; 
            } catch (error) {
                res.status(403).send({err : "user not authenticated custom"})
            }
            
        }
        else {
            try {
                decodedData = jwt.decode(token)
                req.userId = decodedData?.sub ; 
                next() ; 
            } catch (error) {
                res.status(403).send({err : "user not authenticated google "})
            }
        }

    } catch (error) {
        return res.status(403).send({err : "authenticate first"}) ; 
    }
    


}

module.exports = isAuthenticated ;  