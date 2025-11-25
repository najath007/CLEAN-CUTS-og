import { Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Men from './Pages/Men'
import Women from './Pages/Women'
import Kids from './Pages/Kids'
import Brand from './Pages/Brand'


function App() {
    return(
        <div>
            <Navbar />
            <div className='pt-24'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/men' element={<Men />} />
                    <Route path='/women' element={<Women/>} />
                    <Route path='/kids' element={<Kids />} />
                    <Route path='/brands' element={<Brand />}/>
                </Routes>
            </div>

        </div>
    )
 
}

export default App
