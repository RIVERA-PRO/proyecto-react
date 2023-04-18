import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import './details.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { updateDoc } from 'firebase/firestore';
export default function Details() {
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [carrito, setCarrito] = useState([]);

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

    useEffect(() => {
        const getProducto = async () => {
            const productoDoc = doc(db, "products", id)
            const productoSnap = await getDoc(productoDoc)
            if (productoSnap.exists()) {
                setProducto({ id: productoSnap.id, ...productoSnap.data() })
            } else {
                console.log("No se encontró el producto")
            }
        }
        getProducto()
    }, [db, id])

    useEffect(() => {
        // Obtener el carrito del almacenamiento local
        const localCarrito = localStorage.getItem('carrito');
        if (localCarrito) {
            setCarrito(JSON.parse(localCarrito));
        }
    }, []);




    const handleActualizarStock = async (productoId, cantidad) => {
        const productoDoc = doc(db, 'products', productoId);
        await updateDoc(productoDoc, {
            stock: producto.stock - cantidad
        });
    };

    const handleAgregarAlCarrito = async () => {
        setCarrito(prevCarrito => {
            const productoExistente = prevCarrito.find(item => item.id === producto.id);
            const cantidad = 1; // Cantidad a agregar al carrito
            toast.success('Producto agregado'); // Notificación de éxito
            if (productoExistente) {
                const carritoActualizado = prevCarrito.map(item =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
                );
                localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
                handleActualizarStock(producto.id, cantidad); // Actualizar stock en la base de datos

                return carritoActualizado;
            } else {
                const carritoActualizado = [...prevCarrito, { ...producto, cantidad }];
                localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
                handleActualizarStock(producto.id, cantidad); // Actualizar stock en la base de datos

                return carritoActualizado;
            }
        });
    };











    if (!producto) {
        return <div>Cargando...</div>
    }

    return (
        <div className='contain-detail'>
            <ToastContainer />
            <div className='details'>
                <div className='img-detail'>
                    <img src={producto?.img} alt={producto?.title} />
                </div>
                <div className='detail-text'>
                    <p>| {producto?.category} </p>
                    <h3>{producto?.title}</h3>
                    <p className="price">Precio: ${producto?.price}</p>
                    <p>Stock: {producto?.stock} </p>
                    <p>{producto?.description}</p>
                    <button onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
                </div>
            </div>

        </div>
    )
}