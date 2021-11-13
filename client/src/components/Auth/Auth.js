import React from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core' ; 
import useStyles from './styles' 
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {useState} from 'react' 
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom';
import { signUp , signIn} from '../../actions/auth' 
function Auth() {
    const classes = useStyles();
    const dispatch = useDispatch() ;
    const navigate = useNavigate();
    const [isSignup , setIsSignup] = useState(false) ;
    const [showPassword , setShowPassword] = useState(false) ; 
    
    const [formData , setFormData] = useState({
        firstName : '' ,
        lastName : '' ,
        email : '' ,
        password : '' ,
        confirmPassword : '' 
    }) ; 

    
    const handleShowPassword =() => {
        setShowPassword((prevShowPassword)=>!prevShowPassword)
    }
    
    const clear = () =>{ setFormData({
        firstName : '' ,
        lastName : '' ,
        email : '' ,
        password : '' ,
        confirmPassword : '' 
    })}

    const switchMode = () => {
            clear() ;
            setIsSignup( (prev) => !prev ) ; 
            setShowPassword(false) ;
            
    }

    const submitHandler = (e) => {
        e.preventDefault() ; 
        if(isSignup) {
            dispatch(signUp(formData , navigate))
            
        }
        else {
            
            dispatch(signIn(formData , navigate))
            
        }
    }
    const handleChange = (e) => {
        setFormData({
            ...formData ,[e.target.name] : e.target.value  
        })
    }
    const googleSuccess = (res) =>{
            const result = res?.profileObj ; 
            const token = res?.tokenId ;
            try {
                dispatch({type : 'AUTH', data: {result , token}}); 
                navigate('/'); 
                
            } catch (error) {
                console.log(error) ; 
                
            }
           

    }
    const googleError = () =>{
        console.log("something went wrong , google sigin is not successful") ; 
    }
    
    return (
        
       <Container component="main" maxWidth="xs">
           <Paper className={classes.paper} elevation={3}>
               <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
               </Avatar>
               <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                  <Input name="firstName" label="First Name" value={formData.firstName}  handleChange={handleChange} autoFocus half />
                                  <Input name="lastName" label="Last Name" handleChange={handleChange} value={formData.lastName}half />
                                </>
                            )

                        }

                        <Input name="email" label="Email" handleChange={handleChange} value={formData.email}  type="emial" />

                        <Input name='password' label="Password" handleShowPassword={handleShowPassword}  handleChange={handleChange} value={formData.password}  type={showPassword ? "text" : "password"} />
                        

                        {
                            isSignup && (
                                <Input name="confirmPassword" label="Repeat Password"  handleChange={handleChange} type='password' />
                                
                            )
                        }

                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className= {classes.submit} >
                        {isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin
                            clientId="473743931673-qrl71cf8lcghp8agusmad8plr1gg52ja.apps.googleusercontent.com"
                            render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={ googleError }
                            cookiePolicy="single_host_origin"
                        />
                    <Grid container justify="flex-end">
                        <Button onClick={switchMode} >{isSignup ? 'Already have an account? Sign In' : 'Dont have account Sign Up'}</Button>
                    </Grid>
                </form> 
           </Paper>
       </Container>
    )
}

export default Auth
