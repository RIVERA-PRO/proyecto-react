import React, { useState } from 'react'
import './navbar.css'
import Carrito from '../Carrito/Carrito'
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav>
      <div className='logo'>
        <img src="./img/icon/logo.png" alt="logo" />
      </div>

      <div className={`nav_items ${isOpen && "open"}`}>
        <div className='logo-nav'>
          <img src="./img/icon/logo.png" alt="logo" />

        </div>

        <div>
          <div className='enlaces'>
            <Anchor to={`/`} >Inicio</Anchor>
            <a href="#">| Televisores</a>
            <a href="#">| Notebooks</a>
            <a href="#">| Favourites</a>
            <a href="#">| Favourites</a>
          </div>

          <div className='parrafo'>
            Compra rápido y fácil más con nuestra aplicación. Obtener un enlace a descarga la aplicación en tu teléfono
          </div>
        </div>

      </div>

      <Carrito />

      <div className={`nav_toggle  ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>



    </nav>
  )
}
