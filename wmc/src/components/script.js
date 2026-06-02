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
