import PayPal from "../../PayPal/PayPal";
import { Container, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductContext";
import ShoppingCartProductModal from "../../components/ShoppingCartProductModal/ShoppingCartProductModal";

export default function ShoppingCartPage({ user }) {

  const [shoppingCart, setShoppingCart] = useState() //ADDED

  const {cart, getShoppingCartProducts} = useProducts()


    useEffect(() => {
      getShoppingCartProducts(user._id)
      setShoppingCart(true)
      console.log(shoppingCart)
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

  return (
    <>
    <Container className='my-4'>
      <Stack direction="vertical" gap="2" className="mb-4">
      <h1 className='me-auto'>Shopping Cart of {user.name}</h1>
      </Stack>
      <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
              alignItems: "flex-start"
              }}
      >{cart && shoppingCart && cart?.products.map( product => {
        return (
          <ShoppingCartProductModal
          key={product.productId._id}
          name={product.productId.name}
          image={product.productId.image}
          price={product.productId.price}
          />
        )
      })}</div>

    </Container>
    <PayPal />
    </>
  )
}
