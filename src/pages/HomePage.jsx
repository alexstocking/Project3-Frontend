import Slide from "../components/Slide/Slide"
import "./HomePage.css"
import ProductsList from "../pages/ProductsList/ProductList"



export default function HomePage() {
  return (
    <div className="home-page">
      <div className="slide-container" >
        <Slide />
      </div>
      <div className="product-container" style={{ position: "relative" }}>
        <ProductsList />
      </div>
    </div>
  )
}
