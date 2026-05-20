import { useState } from 'react'
import Navbar from './Navbar'
import Impressum from './Impressum'
import './index.css'
import productsData from './Products.json'
import ProductCard from './Productcard'
import Filters from './Filters'
import snowb from './img/snowboardPow.jpg'
import surf from './img/surfing.png'
import wakeb from './img/wakeboarding.jpg'

const imageMap = {
  './img/snowboardPow.jpg': snowb,
  './img/surfing.png': surf,
  './img/wakeboarding.jpg': wakeb,
}

const products = productsData.map(product => ({
  ...product,
  img: imageMap[product.img]
}))

export default function Store() {
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  const filtered = products.filter(product => {
    const matchesBoard = selectedBoard === "" || product.type === selectedBoard;
    const matchesEquipment = selectedEquipment === "" || product.category === selectedEquipment;
    return matchesBoard && matchesEquipment;
  });

  function showAll() {
    setSelectedBoard("");
    setSelectedEquipment("");
    const filters = document.querySelectorAll('.dropdown-select');
    filters.forEach(filter => filter.value = "");
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
            options={["Outerwear", "Layers", "Accessories", "Footwear", "Boards", "Gear"]}
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
              category={product.type}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
      <Impressum />
    </>
  )
}