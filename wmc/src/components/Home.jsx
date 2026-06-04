import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Impressum from "./Impressum";
import "./index.css";
import Filters from "./Filters";
import ProductCard, { ProductCardExperience } from "./Productcard";
import {
  fetchUpcomingEvents,
  fetchUpcomingEventsByCategory,
} from "./script.js";
import skateboardingHeader from "./img/skateboardingHeader.png";
import snowboardingHeading from "./img/snowboardingHeading.png";
import surfingHeader from "./img/surfingHeader.png";
import "./Filters.css";
import experiencesData from "./Experiences.json";
import productsData from "./Products.json";

const eventCategories = ["snowboarding", "surfing", "skateboarding"];
const eventCategoryBackgrounds = {
  snowboarding: snowboardingHeading,
  surfing: surfingHeader,
  skateboarding: skateboardingHeader,
};
const imageModules = import.meta.glob("./img/*", {
  eager: true,
  import: "default",
});

function resolveImage(imagePath) {
  return imageModules[imagePath] || imagePath;
}

export default function Home() {
  const [eventsByCategory, setEventsByCategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  useEffect(() => {
    const loadUpcomingEvents = async () => {
      try {
        setEventsLoading(true);
        const events = selectedCategory
          ? {
              [selectedCategory]:
                await fetchUpcomingEventsByCategory(selectedCategory),
            }
          : await fetchUpcomingEvents();

        setEventsByCategory(events);
        setEventsError(null);
      } catch (error) {
        setEventsError(error.message || "Failed to fetch upcoming events");
        setEventsByCategory({});
      } finally {
        setEventsLoading(false);
      }
    };

    loadUpcomingEvents();
  }, [selectedCategory]);

  function showAll() {
    setSelectedCategory("");
  }

  const visibleCategories = selectedCategory
    ? [selectedCategory]
    : eventCategories;
  const categoriesWithEvents = visibleCategories.filter(
    (category) => (eventsByCategory[category] || []).length > 0,
  );

  const processedExperiences = experiencesData.map((experiences) => ({
    ...experiences,
    img: resolveImage(experiences.img),
  }));
  const firstThreeExperiences = processedExperiences.slice(0, 3);
  const firstThreeProducts = productsData.slice(0, 3).map((product) => ({
    ...product,
    img: resolveImage(product.img),
  }));

  return (
    <>
      <Navbar />
      <div id="home">
        <div className="page-headers">
          <h1 className="page-title">Welcome to onBoards</h1>
          <p>Indulge into an extrodinary sport experience</p>
          <p>Let us guide you through your board-journey</p>
        </div>
      </div>
      <div className="linkSection">
        <h2 className="section-headers">Discover Your Next Adventure</h2>
        <p className="more-link">
          Explore new{" "}
          <Link className="pageChangeLink" to="/experiences">
            experiences
          </Link>
        </p>
        <div id="products-grid" className="products-grid">
          {firstThreeExperiences.length === 0 ? (
            <p className="no-results">No results found</p>
          ) : (
            firstThreeExperiences.map((experience) => (
              <ProductCardExperience
                key={experience.id}
                img={experience.img}
                title={experience.title}
                category={experience.category}
                description={experience.description}
                price={experience.price}
                location={experience.location}
                time={experience.time}
                level={experience.level}
              />
            ))
          )}
        </div>
        <h2 className="section-headers">Take a Look at new looks and gear</h2>
        <p className="more-link">
          Visit our{" "}
          <Link className="pageChangeLink" to="/store">
            products page
          </Link>
        </p>
        <div className="products-grid">
          {firstThreeProducts.map((product) => (
            <ProductCard
              key={product.id}
              img={product.img}
              title={product.title}
              category={product.type}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </div>
      <h2 className="section-headers">Upcoming Events</h2>
      <div className="filters eventFilters">
        <Filters
          name="Category"
          id="category-filter"
          options={eventCategories}
          onFilter={setSelectedCategory}
          value={selectedCategory}
        />
        <button className="showAll-button" onClick={showAll}>
          Show All
        </button>
      </div>

      <div className="upcomingEvents">
        {eventsLoading && <p>Loading events...</p>}
        {eventsError && <p className="error">Error: {eventsError}</p>}
        {!eventsLoading && !eventsError && (
          <div className="eventsCategories">
            {categoriesWithEvents.map((category) => (
              <section
                className="eventCategory"
                key={category}
                style={{
                  "--event-category-bg": `url(${eventCategoryBackgrounds[category]})`,
                }}
              >
                <h3>{category}</h3>
                <div className="eventsGrid">
                  {eventsByCategory[category].map((event) => (
                    <article
                      className="eventCard"
                      key={`${event.category}-${event.eventName}-${event.startDate}`}
                    >
                      <h4>{event.eventName}</h4>
                      <p>
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p>
                        <strong>Start:</strong> {event.startDate}
                      </p>
                      <p>
                        <strong>End:</strong> {event.endDate}
                      </p>
                      <p>
                        <strong>Category:</strong> {event.category}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
      <Impressum />
    </>
  );
}
