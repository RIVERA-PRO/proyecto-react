import React, { useState, useEffect } from 'react'
import './navbar.css'
import Carrito from '../Carrito/Carrito'
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';



export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  let [modalCart, setModalCart] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false)

  const handleModalCart = () => {
    setModalCart(!modalCart);

  };

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <div className='logo'>
        <img src="./img/icon/logo.png" alt="logo" />
      </div>

      <div className={`nav_items ${isOpen && "open"}`} >

        <div className='logo-nav'>
          <img src="./img/icon/logo.png" alt="logo" />

        </div>

        <div>
          <div className='enlaces'>
            <Anchor to={`/`} >Inicio</Anchor>
            <a href="#">| Televisores</a>
            <a href="#">| Notebooks</a>
            <a href="#">| Electronics</a>
            <a href="#">| Escritorios</a>
          </div>

          <div className='parrafo'>
            Compra rápido y fácil más con nuestra aplicación. Obtener un enlace a descarga la aplicación en tu teléfono
          </div>
        </div>

      </div>


      <FontAwesomeIcon className='icon-cart' icon={faShoppingCart} onClick={handleModalCart} />

      <div className={`nav_toggle  ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {modalCart && (
        <div className="modal_content">
          <div className="modal-nav">
            <div className="cerrar-modal" onClick={handleModalCart}>x</div>
            <h3>Tu carrito</h3>
            <Carrito />

          </div>
        </div>
      )}


    </nav>
  )
}
