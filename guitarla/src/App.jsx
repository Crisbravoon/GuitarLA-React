
import { useState } from 'react'
import Guitar from './components/Guitar'
import Header from './components/Header'
import './index.css'
import { db } from './data/GuitarDB'

function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([]);

  const AddToCart = (guitar) => {

    // Buscamos la existencia de la guitarra por id y que no se repita
    const existingItem = cart.find(g => g.id === guitar.id);

    // Si el item ya está en el carrito, incrementamos la cantidad,
    if (existingItem) {
      const updateCart = cart.map(g => g.id === guitar.id ? { ...g, quantity: g.quantity + 1 } : g);
      setCart(updateCart);

      // sino, agregamos el nuevo item al carrito con una cantidad.
    } else {
      setCart([...cart, { ...guitar, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const deleteCart = cart.filter(g => g.id !== id);
    setCart(deleteCart);
  };

  const incrementQuantity = (id) => {
    // Buscamos el item en el carrito por id y incrementamos la cantidad.
    const updateCart = cart.map(item => {
      if (item.id === id && item.quantity < 5) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    })
    setCart(updateCart);
  };

  const decrementQuantity = (id) => {
    // Buscamos el item en el carrito por id y decrementamos la cantidad.
    const updateCart = cart.map(item => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 }
      }
      return item;
    })
    setCart(updateCart);
  };

  const ClearCart = (e) => {
    setCart([]);
  };

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}               
        ClearCart={ClearCart}/>

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (

            <Guitar key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              AddToCart={AddToCart}

            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
