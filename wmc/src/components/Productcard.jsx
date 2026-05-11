import './Productcard.css'

export default function ProductCard({ img, title, category, description, price, id }) {
  return (
    <div className="prodcard">
      <img src={img} alt={title} className="img" />
      <h2 className="product-name">{title}</h2>
      <p className="product-category">{category}</p>
      <p className="product-description">{description}</p>
      <p className="product-price">{price} €</p>
      <p className="product-id">{id}</p>
    </div>
  )
}