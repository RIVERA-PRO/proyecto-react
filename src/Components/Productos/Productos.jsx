import React, { useEffect, useState } from 'react'
import './productos.css'
import { Link as Anchor, useNavigate, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore'

const url = 'https://fakestoreapi.com/products'

export default function Productos() {
    const [productos, setProductos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
    const navigate = useNavigate()

    const firebaseConfig = {
        apiKey: "AIzaSyAoSXWrVlFeWqov4d2LwCJl8b4_Mr9DUxw",
        authDomain: "react-juanrivera.firebaseapp.com",
        projectId: "react-juanrivera",
        storageBucket: "react-juanrivera.appspot.com",
        messagingSenderId: "34379177595",
        appId: "1:34379177595:web:44d9cb161beeb5af824cde"
    };


    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)
    console.log(db)

    useEffect(() => {
        const getItems = async () => {
            const productsRef = collection(db, "products")
            const productsSnap = await getDocs(productsRef)
            const documents = productsSnap.docs
            const docsData = documents.map((doc) => ({ id: doc.id, ...doc.data() })) // Agregar doc.id a los datos del producto
            setProductos(docsData)
            console.log("Productos:", docsData)
            const todasLasCategorias = new Set(docsData.map(p => p.category))
            setCategorias(Array.from(todasLasCategorias))
        }
        getItems()
    }, [db])

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

                {productos.length === 0 ? (
                    <p>Cargando productos...</p>
                ) : (
                    productosFiltrados.length > 0 ? (
                        productosFiltrados.map(producto => (
                            <div className="col-md-4 mb-3" key={producto.id}>
                                <div className="card">
                                    <img src={producto.img} className="card-img-top" alt={producto.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{producto.title.length > 20 ? producto.title.substring(0, 20) + "..." : producto.title}</h5>
                                        <div className='price-link'>
                                            <p className="card-price">${producto.price}</p>
                                            <Anchor className='detail-link' to={`/details/${producto.id}`} onClick={() => handleDetailsClick(producto.id)}>Detalles</Anchor>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron productos.</p>
                    )
                )}

            </div>
        </div>
    )
}
