import React, { useEffect, useState } from 'react'
import './carrito.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

export default function Carrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const [productos, setProductos] = useState(JSON.parse(localStorage.getItem('carrito')) || []);

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...productos];
    nuevoCarrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    setProductos(nuevoCarrito);
    toast.success('Producto eliminado del carrito');
  };

  const vaciarCarrito = () => {
    localStorage.removeItem('carrito');
    setProductos([]);
    toast.success('Carrito vaciado');
  };

  const handleBuy = () => {
    localStorage.removeItem('carrito');
    setProductos([]);
    Swal.fire({
      icon: 'success',
      title: 'Compra realizada con éxito',
      text: `Total: $${calcularTotal()}`,
    });
  };



  const calcularTotal = () => {
    let total = 0;
    for (let i = 0; i < productos.length; i++) {
      const precio = parseFloat(productos[i].price);
      const cantidad = parseInt(productos[i].cantidad);
      total += precio * cantidad;
    }
    return total;
  };
  return (
    <div className="content-carrito">
      {carrito.length > 0 ? (
        <div>
          <div className="sub-content-carrito">
            {carrito.map((producto, index) => {
              return (
                <div className="card-productos" key={index}>
                  <img src={producto.img} alt="" />

                  <div className="card-text-productos">

                    <div className="price-title">
                      <h5>{producto.title.length > 20 ? producto.title.substring(0, 20) + "..." : producto.title}</h5>

                      <p className="carrito-price">${producto.price}</p>
                      <p className="card-price">cantidad: {producto.cantidad}</p>


                    </div>

                  </div>
                  <div className="eliminar" onClick={() => eliminarProducto(index)} >
                    x
                  </div>
                </div>
              );
            })}
          </div>
          <p className="total-price">Total: ${calcularTotal()}</p>
          <div className="vaciar-comprar">
            <button className="vaciar" onClick={() => vaciarCarrito()}>
              Vaciar
            </button>
            <button className="comprar" onClick={() => handleBuy()}>Comprar</button>
          </div>
        </div>
      ) : (
        <p className="no-hay-productos">No hay productos</p>
      )}
      <ToastContainer />
    </div>
  );
};
