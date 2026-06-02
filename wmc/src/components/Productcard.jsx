import "./Productcard.css";

export default function ProductCard({ img, title, description, price }) {
  return (
    <div className="prodcard">
      <img src={img} alt={title} className="img" />
      <h2 className="product-name">{title}</h2>
      <p className="product-description">{description}</p>
      <p className="product-price">{price} €</p>
    </div>
  );
}

export function ProductCardExperience({
  id,
  img,
  title,
  price,
  description,
  location,
  time,
  level,
}) {
  return (
    <>
      <div className="prodcard" id={id}>
        <img src={img} alt={title} className="img" />
        <h2 className="product-name">{title}</h2>
        <p className="product-description">{description}</p>
        <p className="product-level">{level}</p>
        <p className="product-time">{time}</p>
        <p className="product-location">{location}</p>
        <p className="product-price">{price} €</p>
      </div>
    </>
  );
}



export function ReviewCard({ id, name, description, date, rating, course, experienceId }) {
  return (
    <div className="review-card">
      <div className="review-content">
        <h3 className="review-name">{name}</h3>
        <p className="review-text">{description}</p>
        <p className="review-rating">Rating: {rating}/5</p>
        <p className="review-course">
          Course: <a className="courseLink" href="/experiences#products-grid">{course}</a> 
        </p>
        <p className="review-date">{date}</p>
      </div>
    </div>
  );
}
