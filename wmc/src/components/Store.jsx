import Navbar from './Navbar'
import './index.css'
import products from './Products'
import ProductCard from './Productcard'
import Filters from './Filters'

export default function Store() {
  return (
    <>
      <Navbar />
      <div id="store">
        <div className="page-headers">
          <h1 id="page-headers">Our Products</h1>
          <p>Explore our boards, accessories and equipment to get the best experiences.</p>
        </div>
        <div className="filters">
          <div className="boards-filter">
            <label htmlFor="category-type" className="catType">Boards</label>
            <select className="dropdown-select" id="category-type">
              <option value="">-- choose --</option>
              <option value="Snowboards">Snowboards</option>
              <option value="Surfboards">Surfboards</option>
              <option value="Wakeboards">Wakeboards</option>
              <option value="Skateboards">Skateboards</option>
            </select>
          </div>
          <div className="equipment-filter">
            <label htmlFor="category-type" className="catType">Equipment</label>
            <select className="dropdown-select" id="category-type">
              <option value="">-- choose --</option>
              <option value="Outerwear">Outerwear</option>
              <option value="Layers">Layers</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>
        <div className="products-grid">
          {products.map(product => (
          <ProductCard 
          key={product.id}
          id={product.id} 
          img = {product.img} 
          title={product.title} 
          category={product.category} 
          description={product.description} 
          price={product.price}  
        />))}
        </div>
      </div>
    </>
  )
}
