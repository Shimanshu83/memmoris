import { makeStyles } from '@material-ui/core/styles' ; 

// material theme is used for media query 
export default makeStyles((theme) =>({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        marginLeft: '15px',
      },
      [theme.breakpoints.down('sm')]:{
      mainContainer:{
        flexDirection : 'column-reverse'
      }}

    
}))