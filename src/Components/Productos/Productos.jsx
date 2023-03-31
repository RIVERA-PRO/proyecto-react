import React, { useEffect, useState } from 'react'
import './productos.css'
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";

const url = 'https://fakestoreapi.com/products'

export default function Productos() {
    const [productos, setProductos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProductos(data)
                const todasLasCategorias = new Set(data.map(p => p.category))
                setCategorias(Array.from(todasLasCategorias))
            })
    }, [])

    const handleDetailsClick = (id) => {
        navigate(`/details/${id}`)
    }

    const handleCategoriaChange = (event) => {
        setCategoriaSeleccionada(event.target.value)
    }

    // Filtrar productos en función de la búsqueda y la categoría seleccionada
    const productosFiltrados = productos.filter(producto =>
        producto.title.toLowerCase().includes(busqueda.toLowerCase()) &&
        (categoriaSeleccionada === '' || producto.category === categoriaSeleccionada)

    )

    return (
        <div className="container">
            <div className='filtros'>

                <div className="categorias">
                    <div >
                        <input type="checkbox" id="todas" name="todas" value="" checked={categoriaSeleccionada === ''} onChange={handleCategoriaChange} />
                        <label htmlFor="todas">Todas</label>
                    </div>
                    {categorias.map((categoria, index) => (
                        <div className='checks' key={index} >

                            <input type="checkbox" id={categoria} name={categoria} value={categoria} checked={categoriaSeleccionada === categoria} onChange={handleCategoriaChange} />
                            <label htmlFor={categoria}>{categoria}</label>

                        </div>
                    ))}
                </div>
                <div className="buscador">
                    <input className='buscador-input' type="text" placeholder="Buscar producto" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
                </div>
            </div>
            <div className="row">

                {productosFiltrados.map(producto => (
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
