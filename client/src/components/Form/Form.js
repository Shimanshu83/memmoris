import React from 'react'
import { TextField , Button ,Typography , Paper } from '@material-ui/core' ; 
import { useState , useEffect} from 'react';
import useStyles from './styles' ;
import FileBase from 'react-file-base64' ; 
import {useDispatch , useSelector} from 'react-redux' ; 
import {createPost , updatePost} from '../../actions/posts' ; 

function Form({currentId , setCurrentId}) {
     
    const classes = useStyles();
    const dispatch = useDispatch() ; 
    const user = JSON.parse(localStorage.getItem('profile'))
    const post = useSelector(state => currentId ? state.posts.find(post => post._id === currentId ) : null) ; 
    const [postData , setPostData] = useState({

        title : '' ,
        message: '' , 
        tags : '' ,
        selectedFile : ''
    }) 

    useEffect(() =>{
        if(post) {setPostData(post)  };


    },[post ])

    
    
    const clear = () => {
        setCurrentId(null) ; 
        setPostData({
            title : '' ,
            message: '' , 
            tags : '' ,
            selectedFile : ''
        });
        

    } ;

    
    
    const SubmitHandler = (e) => {
        e.preventDefault() ; 

        if(currentId!= null) {
        dispatch(updatePost(currentId , {...postData , name : user?.result?.name })) ;
        }
        else {
            
        dispatch(createPost({...postData , name : user?.result?.name }))
        
        }
        clear() ; 


    } ;
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant='h6' align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }
  
    const messageFieldHandler = (e) => {

        setPostData(
            (data) => {
                return {
                    ...data , 
                    message : e.target.value
                }
            }
        )
    }
    const titleFieldHandler = (e) => {

        setPostData(
            (data) => {
                return {
                    ...data , 
                    title : e.target.value
                }
            }
        )
    }
    const tagsFieldHandler = (e) => {

        setPostData(
            (data) => {
                var value = e.target.value.split(',') ; 
              
                return {
                    ...data , 
                    tags : value 
                }
            }
        )
    }


    return (

        <Paper className={classes.paper}>
            <form autocomplete="off" noValidate className={` ${classes.form} ${classes.root} `} onSubmit = {SubmitHandler}>
                <Typography variant="h6" > { currentId ? 'Editing' : 'Creating' } a Memmory </Typography>
                 <TextField 
                name="title" 
                variant="outlined" 
                label="Title" 
                fullWidth
                value={postData.title}
                onChange={ titleFieldHandler }
                />
                 <TextField 
                name="message" 
                variant="outlined" 
                label="Message" 
                fullWidth
                value={postData.message}
                onChange={ messageFieldHandler }
                />
                 <TextField 
                name="tags" 
                variant="outlined" 
                label="Tags" 
                fullWidth
                value={postData.tags}
                onChange={ tagsFieldHandler }
                />
                <div className={classes.fileInput}>
                    <FileBase
                    type = "file"
                    multiple={false}
                    onDone= {({base64}) => setPostData({...postData , selectedFile : base64})} />

                </div>
                <Button 
                className={classes.buttonSubmit}
                type="submit"
                variant="contained"
                color="primary"
                size="large"   
                fullWidth>
                    Submit
                </Button>

                <Button 
                variant="contained"
                color="secondary"
                size="small"   
                fullWidth
                onClick={clear}
                >
                 clear
                </Button>
            </form>
        </Paper>
        )
}

export default Form
