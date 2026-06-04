import { useState, useEffect, useRef } from "react"; 
// useEffect runs the code once the component loads, useState is for state management
import Navbar from "./Navbar";
import Impressum from "./Impressum";
import "./index.css";
import { ProductCardExperience, ReviewCard } from "./Productcard";
import Filters from "./Filters";
import { InputFilter } from "./Filters";
import experiencesData from "./Experiences.json";
import reviewsData from "./Reviews.json";
import { fetchWaveData, getLocationName, searchLocation } from "./script.js";

const imageModules = import.meta.glob("./img/*", {
  eager: true,
  import: "default",
});

function resolveImage(imagePath) {
  return imageModules[imagePath] || imagePath;
}

const processedExperiences = experiencesData.map((experience) => ({
  ...experience,
  img: resolveImage(experience.img),
}));

export default function Experiences() {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 54.3213, 
    longitude: 10.1349
  });
  const hasScrolledToHash = useRef(false);

  // Fetch wave data on component mount and when location changes
  useEffect(() => {
    const loadWaveData = async () => {
      try {
        setLoading(true);
        const data = await fetchWaveData(currentLocation.latitude, currentLocation.longitude);
        
        let locationName = { city: "Unknown", country: "Unknown" };
        try {
          locationName = await getLocationName(currentLocation.latitude, currentLocation.longitude);
        } catch (locErr) {
          console.warn("Could not fetch location name, using defaults:", locErr.message);
        }
        
        setWeatherData({
          ...data,
          location: locationName,
        });
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch wave data");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    loadWaveData();
  }, [currentLocation]);

  // Handle location search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    try {
      setSearchLoading(true);
      const result = await searchLocation(searchInput);
      setCurrentLocation({
        latitude: result.latitude,
        longitude: result.longitude,
      });
      setSearchInput("");
      setError(null);
    } catch (err) {
      setError(err.message || "Location not found");
    } finally {
      setSearchLoading(false);
    }
  };

  const filtered = processedExperiences.filter((experience) => {
    const matchesLevel = selectedLevel === "" || experience.level === selectedLevel;
    const matchesType = selectedType === "" || experience.type === selectedType;
    const matchesCountry = selectedCountry === "" || experience.location.toLowerCase().includes(selectedCountry.toLowerCase());
    return matchesLevel && matchesType && matchesCountry;
  });

  const hourlyForecastByDay = weatherData?.hourly?.time?.reduce((days, date, index) => {
    const day = formatDate(date);
    if (!days[day]) {
      days[day] = [];
    }

    days[day].push({
      time: formatTime(date),
      waveHeight: weatherData.hourly.wave_height[index] ?? "N/A",
      wavePeriod: weatherData.hourly.wave_period[index] ?? "N/A",
    });

    return days;
  }, {});

  function showAll() {
    setSelectedLevel("");
    setSelectedType("");
    setSelectedCountry("");
    const filters = document.querySelectorAll(".dropdown-select, .country-input");
    filters.forEach((filter) => (filter.value = ""));
  }

  // Format datetime string to DD.MM.YY T HH:MM
  function formatDateTime(dateTimeString) {
    try {
      const date = new Date(dateTimeString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    } catch (error) {
      return dateTimeString;
    }
  }

  function formatTime(timeString) {
    try {
      const date = new Date(timeString);
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    } catch (error) {
      return timeString;
    }
  }

  function formatDate(dateString) {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${day}.${month}.${year}`;
    } catch (error) {
      return dateString;
    }
  }

  function getWaveHeightIndicatorClass(waveHeight) {
    const height = Number(waveHeight);
    if (Number.isNaN(height)) return "";
    if (height >= 2) return "indicator-high";
    if (height >= 1) return "indicator-ideal";
    return "indicator-low";
  }

  function getWavePeriodIndicatorClass(wavePeriod) {
    const period = Number(wavePeriod);
    if (Number.isNaN(period)) return "";
    if (period >= 8) return "indicator-low";
    if (period >= 5) return "indicator-ideal";
    return "indicator-high";
  }

  // Scroll to experience when clicking on the link in the review card
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Clear filters to show the specific experience
      setSelectedLevel("");
      setSelectedType("");
      setSelectedCountry("");
    }
  }, []);

  // Scroll when filtered array updates (after filters are cleared)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && !hasScrolledToHash.current) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          hasScrolledToHash.current = true;
        }
      }, 100);
    }
  }, [filtered]);

  return (
    <>
      <Navbar />
      <div id="experiences">
        <div className="page-headers" id="experiences-header">
          <h1 className="page-title">Experiences</h1>
          <p class="text-content">
            Learn the sport you've always wanted to try.
          </p>
        </div>
        <div className="filters">
          <Filters
            name="Level"
            id="level-filter"
            options={["Beginner", "Intermediate", "Advanced"]}
            onFilter={setSelectedLevel}
          />
          <Filters
            name="Type"
            id="type-filter"
            options={["Snowboarding", "Surfing", "Wakeboarding", "Skateboarding", "Kitesurfing", "Windsurfing"]}
            onFilter={setSelectedType}
          />
          <InputFilter 
            name="Country"
            id="country-filter"
            onFilter={setSelectedCountry}
          />
          <button className="showAll-button" onClick={showAll}>
            Show All
          </button>
        </div>
        <div id="products-grid" className="products-grid">
          {filtered.length === 0 ? (
            <p className="no-results">No results found</p>
          ) : (
            filtered.map((experience) => (
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
        <h2 className="section-headers">Reviews</h2>
        <div className="reviews">
          <div className="reviews-grid">
            {reviewsData.map((review) => (
              <ReviewCard 
                key={review.id}
                name={review.name}
                description={review.description}
                date={review.date}
                rating={review.rating}
                course={review.course}
                experienceId={review.experienceId}
              />
            ))}
          </div>
        </div>
      </div>
      <h2 className="section-headers">Wave Forecast</h2>
        {/* Location Search Form */}
        <form onSubmit={handleSearch} className="locationsearch">
          <div  className="filters">
            <input className="location-input"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for a location (city)"
            />
            <button className="button"
              type="submit"
              disabled={searchLoading}
            >
              {searchLoading ? "Searching..." : "Search"}
            </button>
            <button className="button"
              type="button"            
              onClick={(e) => {
                e.preventDefault();
                setSearchInput("");
                setCurrentLocation({latitude: 54.3213, longitude: 10.1349});
                setError(null);
                setSearchLoading(false);
              }}
              disabled={searchLoading}
            >
              Reset
            </button>
          </div>
        </form>

      <div className="load-weather-data">   
        <div className="loadingError">
          {loading && <p>Loading wave data...</p>}
          {error && <p className="error">Error: {error}</p>}
        </div>
        {weatherData && weatherData.location && (
          <>
            <div className="wave-data">
              <div className="locations">
                <h3 className="wave-headings"><strong>Location:</strong> {weatherData.location.city || "Unknown"}, {weatherData.location.country || "Unknown"}</h3>
                <p className="wave-headings"><strong>Coordinates:</strong> Latitude {weatherData.latitude}°, Longitude {weatherData.longitude}°</p>
                <p className="wave-headings"><strong>Timezone:</strong> {weatherData.timezone || "Unknown"}</p>
              </div>
              <div className="currentConditions">
                <h3>Current Conditions</h3>
                <p>
                  <strong>Wave Height:</strong>{" "}
                  <span className={getWaveHeightIndicatorClass(weatherData.current?.wave_height)}>
                    {weatherData.current?.wave_height || "N/A"} m
                  </span>
                </p>
                <p>
                  <strong>Wave Period:</strong>{" "}
                  <span className={getWavePeriodIndicatorClass(weatherData.current?.wave_period)}>
                    {weatherData.current?.wave_period || "N/A"} s
                  </span>
                </p>
              </div>
            </div>
            <div className="hourlyConditions">
              {weatherData.hourly && (
              <>
                <h3>Hourly Forecast - next 7 days</h3>
                <p className="indicators">
                  <strong>
                    Wave height indicators: <span className="indicator-high">high</span>, <span className="indicator-ideal">ideal</span>, <span className="indicator-low">small</span>
                  </strong>
                </p>
                <p className="indicators">
                  <strong>
                    Wave period indicators: <span className="indicator-low">long</span>, <span className="indicator-ideal">ideal</span>, <span className="indicator-high">short</span>
                  </strong>
                </p>
                <div className="hourlyForecast">
                  {hourlyForecastByDay && Object.entries(hourlyForecastByDay).map(([day, forecasts]) => (
                    <div className="forecastReturn" key={day}>
                      <div className="day-header"><strong>{day}</strong></div>
                      <ul>
                        {forecasts.map((forecast) => (
                          <li key={forecast.time}>
                            {forecast.time}: Wave Height - <span className={getWaveHeightIndicatorClass(forecast.waveHeight)}>{forecast.waveHeight}m</span>, Wave Period - <span className={getWavePeriodIndicatorClass(forecast.wavePeriod)}>{forecast.wavePeriod}s</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
              )}
            </div>
          </>
        )}
      </div>
      <Impressum />
    </>
  );
}
