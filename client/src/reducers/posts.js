import { CREATE , UPDATE , DELETE , LIKE , FETCH_ALL} from '../constants/actionTypes';

const reducers = (posts = [] , action)=>{
    switch(action.type){
        case FETCH_ALL :
            return action.payload  ;
        case CREATE: 
            return [action.payload , ...posts]  ;   
        case UPDATE:  
            return posts.map(post => post._id === action.payload._id ? action.payload : post ) ; 
        case LIKE : 
        const  result = posts.map(post => post._id === action.payload._id ? action.payload : post ) ;  

        return result ; 
        case DELETE :
            return posts.filter(post => post._id !== action.payload  ); 

        default : return posts ; 
    }
}

export default reducers ; 