import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './details.css'
const url = 'https://fakestoreapi.com/products'

export default function Details() {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)

    useEffect(() => {
        fetch(`${url}/${id}`)
            .then(res => res.json())
            .then(data => setProducto(data))
    }, [id])

    if (!producto) {
        return <div>Cargando...</div>
    }

    return (
        <div className='contain-detail'>
            <div className='details'>

                <div className='img-detail'>
                    <img src={producto.image} alt={producto.title} />
                </div>
                <div className='detail-text'>
                    <p>| {producto.category} | promedio {producto.rating.rate} | calificaciones {producto.rating.count}</p>
                    <h3>{producto.title}</h3>
                    <p className="price">Precio: ${producto.price}</p>
                    <p>{producto.description}</p>
                    <button> Agregar al carrito</button>

                </div>
            </div>
        </div>
    )
}
