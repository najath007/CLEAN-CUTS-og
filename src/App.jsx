import { Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Men from './Pages/Men'
import Women from './Pages/Women'
import Kids from './Pages/Kids'
import Brand from './Pages/Brand'
import Cart from './Pages/Cart'
import Favorite from './Pages/Favorite'
import Login from './Pages/Login'
import ProductDetail from './Pages/ProductDetail'



function App() {
    return(
        <div>
            <Navbar />
            <div className='pt-28'>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/men' element={<Men />} />
                    <Route path='/women' element={<Women/>} />
                    <Route path='/kids' element={<Kids />} />
                    <Route path='/brands' element={<Brand />}/>
                    <Route path='/cart' element={<Cart />}/>
                    <Route path='/favorite' element={<Favorite/>}/>
                    <Route path='/login' element={<Login/>} />
                    <Route path='/product/:id' element={<ProductDetail />} />
                </Routes>
            </div>

        </div>
    )
 
}

export default App
