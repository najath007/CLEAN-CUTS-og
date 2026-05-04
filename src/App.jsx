import { Routes, Route, useLocation } from 'react-router-dom'
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
import Admin from './Pages/Admin'
import ProductDetail from './Pages/ProductDetail'

function AppLayout() {
    const location = useLocation();
    const isFullScreen = ['/login', '/admin'].includes(location.pathname);

    return (
        <div>
            {!isFullScreen && <Navbar />}
            <div className={isFullScreen ? '' : 'pt-28'}>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/men' element={<Men />} />
                    <Route path='/women' element={<Women/>} />
                    <Route path='/kids' element={<Kids />} />
                    <Route path='/brands' element={<Brand />}/>
                    <Route path='/cart' element={<Cart />}/>
                    <Route path='/favorite' element={<Favorite/>}/>
                    <Route path='/login' element={<Login/>} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/product/:id' element={<ProductDetail />} />
                </Routes>
            </div>
        </div>
    )
}

function App() {
    return <AppLayout />;
}

export default App
