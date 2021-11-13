const router = require('express').Router() ; 
const register = require('../controller/register') ;
const initialRegisterCheck = require('../controller/initialRegisterCheck') ;
const userAuthentication = require('../controller/userAuthentication');

router.post('/signUp' , initialRegisterCheck , register ); 

router.post('/signIn' , userAuthentication); 

module.exports = router;