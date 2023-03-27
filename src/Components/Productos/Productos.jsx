import React, { useEffect, useState } from 'react'
import './productos.css'
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";

const url = 'https://fakestoreapi.com/products'

export default function Productos() {
    const [productos, setProductos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setProductos(data))
    }, [])

    const handleDetailsClick = (id) => {
        navigate(`/details/${id}`)
    }

    return (
        <div className="container">
            <div className="row">
                {productos.map(producto => (
                    <div className="col-md-4 mb-3" key={producto.id}>
                        <div className="card">
                            <img src={producto.image} className="card-img-top" alt={producto.title} />
                            <div className="card-body">
                                <h5 className="card-title">{producto.title}</h5>
                                <div className='price-link'>
                                    <p className="card-price">${producto.price}</p>
                                    <Anchor className='detail-link' to={`/details/${producto.id}`} onClick={() => handleDetailsClick(producto.id)}>Detalles</Anchor>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
