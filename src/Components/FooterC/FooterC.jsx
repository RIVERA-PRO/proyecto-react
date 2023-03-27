import React from 'react'
import './footerC.css'

export default function Footer() {
  return (
    <div className='footer-descripcion'>

              <div>
                <h5>Contáctenos</h5>
                <a href=".">Call us 24/7</a>
                <a href=".">1800 97 97 69</a>
                <a href=".">Salta, Argentina</a>
                <a href=".">contact@martfury.com</a>
                <section class="redes-sociales">
                    <a href="#"><i class='fa fa-facebook'></i></a>
                    <a href="#"><i class='fa fa-instagram'></i></a>
                    <a href="#"> <i class='fa fa-linkedin'></i></a>
                    <a href="#"><i class='fa fa-twitter'></i></a>
                    <a href="#"> <i class='fa fa-whatsapp'></i></a>
                </section>
            </div>

            <div>
                <h5>Enlaces rápidos</h5>
                <a href=".">Computadora de escritorio</a>
                <a href=".">Computadora portátil </a>
                <a href=".">teléfonos inteligentes </a>
                <a href=".">Tableta </a>
                <a href=".">Control de juego</a>
                <a href=".">Audio Video</a>
            </div>

            <div>
                <h5>Compañía</h5>
                <a href=".">Cuidado del cabello</a>
                <a href="."> Constituir</a>
                <a href=".">Ducha Corporal</a>
                <a href=".">Protección de la piel</a>
                <a href=".">Colonia </a>
                <a href=".">Perfume </a>
            </div>

            <div>
                <h5>Negocios</h5>
                <a href=".">Collar</a>
                <a href=".">Colgante </a>
                <a href=".">Anillo de diamantes</a>
                <a href="."> Pendiente de astilla</a>
                <a href=".">Vigilante de cuero </a>
                <a href=".">Rolex </a>
            </div>

            <div className='form'>
              <h5>Contactanos</h5>
            <form action="">
              <div className='email'><input type="mail" /></div>
              <input type="submit" />
            </form>
            <img src="./img/pagos/mercado_pago.jpg" alt="logo" />

       
            </div>

      
    </div>
  )
}
