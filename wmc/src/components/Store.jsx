import { useState } from 'react'
import Navbar from './Navbar'
import './index.css'
import products from './Products'
import ProductCard from './Productcard'
import Filters from './Filters'

export default function Store() {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  const filtered = products.filter(product => {
    const matchesBoard = selectedBoard === "" || product.category === selectedBoard;
    const matchesEquipment = selectedEquipment === "" || product.category === selectedEquipment;
    return matchesBoard || matchesEquipment;
  });

  function showAll() {
    setSelectedBoard("");
    setSelectedEquipment("");
  }

  return (
    <>
      <Navbar />
      <div id="store">
        <div className="page-headers">
          <h1 id="page-headers">Our Products</h1>
          <p>Explore our boards, accessories and equipment to get the best experiences.</p>
        </div>
        <div className="filters">
          <Filters
            name="Boards"
            id="boards-filter"
            options={["Snowboards", "Surfboards", "Wakeboards", "Skateboards"]}
            onFilter={setSelectedBoard}
          />
          <Filters
            name="Equipment"
            id="equipment-filter"
            options={["Outerwear", "Layers", "Accessories"]}
            onFilter={setSelectedEquipment}
          />
          <button className="showAll-button" onClick={showAll}>Show All</button>
        </div>
        <div className="products-grid">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              img={product.img}
              title={product.title}
              category={product.category}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </>
  )
}