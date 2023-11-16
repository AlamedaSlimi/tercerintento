import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'
//eslint-disable-next-line
function Nav({ setIsLogin }) {


  const logoutSubmit = () => {
    localStorage.clear()
    setIsLogin(false)
  }

  return (
    <nav className='main-nav'>
      <div className="logo">
        <h2>Note App</h2>
      </div>
        <ul className='menu'>
          <li className='menu_item'><Link to="/">Inicio</Link></li>
          <li className='menu_item'><Link to="/create">Crear nota</Link></li>
          <li className='menu_item'><Link to="/about">Generar frase</Link></li>
            <li className=" menu_item" onClick={logoutSubmit}><Link to="/">Salir</Link></li>
      </ul>
    </nav>
  )
}


export default Nav
