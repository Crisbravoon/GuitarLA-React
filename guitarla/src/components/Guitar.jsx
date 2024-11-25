
import { useState } from 'react'

import { db } from '../data/GuitarDB'

const Guitar = () => {

    const [data, setData] = useState(db);
    const [cart, setCart] = useState([]);

    const AddToCart = (guitar) => {

        // Buscamos la existencia de la guitarra por id y que no se repita
        const existingItem = cart.find(g => g.id === guitar.id);

        // Si el item ya está en el carrito, incrementamos la cantidad,
        if (existingItem) {
            const updateCart = cart.map(g => 
                g.id === guitar.id ? { ...g, guantity: g.guantity + 1 } : g);
            setCart(updateCart);

        // sino, agregamos el nuevo item al carrito con una cantidad.
        }else{
            setCart([...cart, {...guitar, guantity: 1 }]);
        }
    };

    return (
        <>
            {data.map((g) => (
                <div className="col-md-6 col-lg-4 my-4 row align-items-center" key={g.id}>
                    <div className="col-4" >
                        <img className="img-fluid" src={`/img/${g.image}.jpg`} alt="imagen guitarra" />
                    </div>
                    <div className="col-8">
                        <h3 className="text-black fs-4 fw-bold text-uppercase">{g.name}</h3>
                        <p>{g.description}</p>
                        <p className="fw-black text-primary fs-3">${g.price}</p>
                        <button
                            className="btn btn-dark w-100"
                            onClick={() => AddToCart(g)}
                            type="button"
                        >Agregar al Carrito</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Guitar