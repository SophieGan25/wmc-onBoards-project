/**
 * Fetches wave data from Open-Meteo Marine API
 * @param {number} latitude - The latitude coordinate
 * @param {number} longitude - The longitude coordinate
 * @returns {Promise<Object>} Object containing latitude, longitude, current wave data, and hourly forecast
 */
export async function fetchWaveData(latitude = 54.544587, longitude = 10.227487) {
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height,wave_period&current=wave_height,wave_period`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Response status: ${response.status}`);
    }

    // Check if response has content
    const text = await response.text();
    if (!text || text.length === 0) {
      throw new Error("API returned empty response");
    }

    const data = JSON.parse(text);
    
    // Log the API response to debug
    console.log("API Response:", data);
    
    // Return structured data with the fields you need
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      current: {
        wave_height: data.current?.wave_height ?? "N/A",
        wave_period: data.current?.wave_period ?? "N/A",
      },
      hourly: {
        time: data.hourly?.time || [],
        wave_height: data.hourly?.wave_height || [],
        wave_period: data.hourly?.wave_period || [],
      },
    };
  } catch (error) {
    console.error("Error fetching wave data:", error.message);
    throw error;
  }
}

/**
 * Converts latitude and longitude to city/country name using Nominatim API
 * @param {number} latitude - The latitude coordinate
 * @param {number} longitude - The longitude coordinate
 * @returns {Promise<Object>} Object containing city, country, and full address
 */
export async function getLocationName(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding API Response status: ${response.status}`);
    }

    const text = await response.text();
    if (!text || text.length === 0) {
      throw new Error("Geocoding API returned empty response");
    }

    const data = JSON.parse(text);
    
    return {
      city: data.address.city || data.address.town || data.address.village || "Unknown",
      country: data.address.country || "Unknown",
      countryCode: data.address.country_code?.toUpperCase() || "Unknown",
      fullAddress: data.display_name,
    };
  } catch (error) {
    console.error("Error fetching location name:", error.message);
    throw error;
  }
}

/**
 * Searches for a location by name and returns coordinates
 * @param {string} locationName - The name of the location (city, country, address)
 * @returns {Promise<Object>} Object containing latitude, longitude, display name, and country
 */
export async function searchLocation(locationName) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Search API Response status: ${response.status}`);
    }

    const text = await response.text();
    if (!text || text.length === 0) {
      throw new Error(`No location found for "${locationName}"`);
    }

    const data = JSON.parse(text);
    
    if (!data || data.length === 0) {
      throw new Error(`No location found for "${locationName}"`);
    }

    const result = data[0]; // the json returns possibly multiple objects so take the top one
    return {
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
      displayName: result.display_name,
      country: result.address?.country || "Unknown",
    };
  } catch (error) {
    console.error("Error searching location:", error.message);
    throw error;
  }
}

export function resetLocation() {
  return {
    latitude: null,
    longitude: null,
    displayName: "Location not found",
    country: "Unknown",
  };
}

const BOARDRIDING_EVENT_CATEGORIES = ["snowboarding", "surfing", "skateboarding"];

function formatEventCategory(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function formatEuropeanDate(dateText) {
  const dateParts = dateText.split("/").map((part) => part.trim());

  if (dateParts.length !== 3) {
    return dateText;
  }

  const [month, day, year] = dateParts;
  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
}

function parseEventDates(dateText) {
  const [startDate, endDate] = dateText
    .split("-")
    .map((date) => date.trim())
    .filter(Boolean);

  return {
    startDate: startDate ? formatEuropeanDate(startDate) : "Unknown",
    endDate: endDate ? formatEuropeanDate(endDate) : startDate ? formatEuropeanDate(startDate) : "Unknown",
  };
}

function parseBoardridingEvents(html, category, limit) {
  const document = new DOMParser().parseFromString(html, "text/html");
  const eventCards = Array.from(document.querySelectorAll("a.box-events"));

  return eventCards.slice(0, limit).map((card) => {
    const dateText = card.querySelector(".LabelDatumSpan")?.textContent.trim() || "";
    const { startDate, endDate } = parseEventDates(dateText);
    const eventUrl = card.getAttribute("href") || "";

    return {
      eventName: card.querySelector("#LabelTit")?.textContent.trim() || card.title || "Unknown event",
      location: card.querySelector(".ImageFlagCountry")?.textContent.trim() || "Unknown location",
      startDate,
      endDate,
      category: formatEventCategory(category),
      url: eventUrl.startsWith("http") ? eventUrl : `https://www.boardriding.com/${eventUrl.replace(/^\/+/, "")}`,
    };
  });
}

/**
 * Fetches upcoming Boardriding events for one category.
 * @param {string} category - snowboarding, surfing, or skateboarding
 * @param {number} limit - Maximum number of events to return
 * @returns {Promise<Array>} Events with eventName, location, startDate, endDate, category, and url
 */
export async function fetchUpcomingEventsByCategory(category = "snowboarding", limit = 3) {
  const normalizedCategory = category.toLowerCase();

  if (!BOARDRIDING_EVENT_CATEGORIES.includes(normalizedCategory)) {
    throw new Error(`Unsupported event category: ${category}`);
  }

  const url = import.meta.env.DEV
    ? `/boardriding/events?show=${normalizedCategory}`
    : `https://www.boardriding.com/events?show=${normalizedCategory}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Events API Response status: ${response.status}`);
    }

    const html = await response.text();
    if (!html || html.length === 0) {
      throw new Error(`Events API returned empty response for ${normalizedCategory}`);
    }

    return parseBoardridingEvents(html, normalizedCategory, limit);
  } catch (error) {
    console.error(`Error fetching ${normalizedCategory} events:`, error.message);
    throw error;
  }
}

/**
 * Fetches upcoming Boardriding events for snowboarding, surfing, and skateboarding.
 * @returns {Promise<Object>} Object grouped by category
 */
export async function fetchUpcomingEvents(limitPerCategory = 3) {
  const eventsByCategory = await Promise.all(
    BOARDRIDING_EVENT_CATEGORIES.map(async (category) => ({
      category,
      events: await fetchUpcomingEventsByCategory(category, limitPerCategory),
    }))
  );

  return eventsByCategory.reduce((events, categoryResult) => {
    events[categoryResult.category] = categoryResult.events;
    return events;
  }, {});
}
