import React ,{useState} from 'react' ; 
import { Container } from '@material-ui/core' ; 
import { BrowserRouter , Routes , Route} from 'react-router-dom' ; 


import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth'

function App() {
    const [isAcount, setIsAcount] = useState(false); 
    return (
        <BrowserRouter>
            <Container maxwidth="lg">
                <Navbar setIsAcount={setIsAcount} />
                <Routes>
                    <Route path="/" exact element={<Home/>} />
                    
                    <Route path="/auth" exact element={<Auth/>} />
                </Routes>
              
            </Container>
        </BrowserRouter>
        )
}

export default App
