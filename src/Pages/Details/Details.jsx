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
                    <h1>{producto.title}</h1>
                    <p>{producto.description}</p>
                    <p>Precio: ${producto.price}</p>
                </div>
            </div>
        </div>
    )
}
