import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-white z-50 shadow">
      <div className="h-20 flex items-center justify-between px-4">

        {/* Logo */}
        <Link to={`/`}><img src="images/logo.png" alt="Logo" className="h-28" /></Link>
        

        {/* Menu - hidden on small screens */}
        <div className="hidden md:flex justify-center gap-8 text-gray-500 font-medium">
          <Link to={`/men`} className="cursor-pointer hover:text-black">MEN</Link>
          <Link to={`/women`} className="cursor-pointer hover:text-black">WOMEN</Link>
          <Link to={`/kids`} className="cursor-pointer hover:text-black">KIDS</Link>
          <Link to={`/brands`} className="cursor-pointer hover:text-black">BRAND</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="border-2 border-black rounded-full w-64 lg:w-80 text-center px-3 py-1"
          />

          <button className="border-2 border-black rounded-full px-4 py-1 ml-2">
            Search
          </button>
        </div>

        {/* Icons */}
        <div className="flex md:flex gap-3 text-xl">
          <Link to={`/favorite`} title="Favorite">❤️</Link>
          <Link to={`/cart`} title="Cart">🛒</Link>
          <Link to={`/login`} title="Login">👤</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-3xl cursor-pointer">
          ☰
        </div>
      </div>
    </div>
  );
}
