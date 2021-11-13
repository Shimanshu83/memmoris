import React  , { useState , useEffect}from 'react'
import { Link , useLocation } from 'react-router-dom' ; 
import {AppBar , Typography , Toolbar , Avatar , Button} from '@material-ui/core'
import useStyles from './styles'
import decode from 'jwt-decode' 
import memories from '../../images/memories.png' ; 
import { useDispatch } from 'react-redux' 
import { useNavigate } from 'react-router-dom'

function Navbar({setIsAcount}) {
    const classes = useStyles();
    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ;
    const location = useLocation() ;

    const [user , setUser] = useState( JSON.parse(localStorage.getItem('profile')));
    
    const logout = () =>{
        setIsAcount(true) ;
        dispatch({type : 'LOGOUT'}) ;
        setUser(null) ; 
        navigate('/') ;
        
        

    }
    useEffect(() => {
        const token = user?.token ; 
        
        if (token) {
            const decodedToken = decode(token) ; 
            if(decodedToken.exp * 1000 < new Date().getTime() ) {
                logout()
            }
        }


        setUser( JSON.parse(localStorage.getItem('profile')));

    }, [location]) 

    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Typography component={Link} to="/" className={classes.heading} variant="h2"  align=
                    "center">
                        Memories
                    </Typography>
                    <img className={classes.image} src={memories} alt="memories" height="60" />
                </div>
                <Toolbar className={classes.toolbar} >

                    {
                        user ? (
                            <div className={classes.profile}>
                                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                    {user.result.name.charAt(0)}
                                </Avatar>
                                <Typography variant="h6" className={classes.userName} >
                                    {user.result.name}
                                </Typography>
                                <Button variant="contained" className={classes.logout} color='secondary' onClick={logout}>
                                    Logout
                                </Button>
                            </div>
                        ) : 
                        (
                            <Button variant="contained" component={Link} to="/auth"  color='primary' >
                                    Login
                            </Button>

                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
