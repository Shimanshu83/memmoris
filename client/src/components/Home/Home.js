import React from "react";
import { Container ,  Grow , Grid} from '@material-ui/core' ; 
import Posts from '../Posts/Posts' ; 
import Form from '../Form/Form' ; 
import {getPosts} from '../../actions/posts' ; 
import { useEffect , useState } from 'react';
import { useDispatch  } from 'react-redux';
import useStyles from './styles'

function Home() {
    const [currentId , setCurrentId] = useState(null) ; 
    const classes = useStyles(); 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts()) ; 
        
    }, [currentId , dispatch ]) ; 

  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid
            setCurrentId={setCurrentId}
            currentId={currentId}
            item
            xs={12}
            sm={4}
          >
            <Form setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
