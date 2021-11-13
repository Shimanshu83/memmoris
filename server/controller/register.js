const User = require('../models/userModel');
const {genPassword} = require('../util/passwordUtils')
const jwt = require('jsonwebtoken');



const register = async (req, res) => {
    const {email, password , firstName, lastName} = req.body;   

    try {
        const alreadyExist = await User.findOne({email: email})
        
        if(alreadyExist){

            return res.status(401).send("email already exists");
        }
        else{
            const passwordHash = genPassword(password);
            var user =  new User(
                {
                    email : email,
                    firstName : firstName,
                    lastName : lastName,
                    password : passwordHash
                }
            )

            try {
        
                user = await user.save() ;
                const payload = {
                    email : user.email ,
                    id : user._id 
                }
                
                try {
                    const token = jwt.sign(payload , process.env.ACCESS_TOKEN_SECRET , {expiresIn : '100000000s'});
                
                    return res.status(200).json({result : {...user._doc , name :  `${user.firstName} ${user.lastName}` } , token : token});
                    
                } catch (error) {
                    res.status(500).json({message : "something went wrong"}) ; 
                }
            
                
                
            
                
            } catch (error) {
                console.log(error) ; 

                if(error){
                return res.status(500).send({err : error})
            }
            }

            
        }
    } catch (error) {
        console.log(error) ; 
               return res.status(500).send({err : "some thingh went wrong "});
    }   
}
module.exports = register ; 