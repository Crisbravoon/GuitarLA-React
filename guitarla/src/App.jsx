
import { useCart } from './hooks/useCart'
import Guitar from './components/Guitar'
import Header from './components/Header'
import './index.css'

function App() {

  const {
    data,
    cart,
    ClearCart,
    AddToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        ClearCart={ClearCart} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (

            <Guitar key={guitar.id}
              guitar={guitar}
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
