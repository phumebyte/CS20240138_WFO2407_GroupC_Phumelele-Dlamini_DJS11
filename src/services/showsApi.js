//getAllSHows()
//getShowDetails(showId)
// src/services/showApis.js

const BASE_URL = "https://podcast-api.netlify.app";

/**
 * Fetch all PREVIEW objects (summarized list of all shows).
 * @returns {Promise<Array>} An array of preview objects.
 */
export const fetchPreviews = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch previews");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching previews:", error);
    throw error;
  }
};

/**
 * Fetch detailed information for a specific GENRE by ID.
 * @param {string} genreId - The ID of the genre to fetch.
 * @returns {Promise<Object>} Detailed information about the genre.
 */
export const fetchGenreById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/genre/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch genre with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching genre with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch detailed information for a specific SHOW by ID.
 * @param {string} showId - The ID of the show to fetch.
 * @returns {Promise<Object>} Detailed information about the show, including seasons and episodes.
 */
export const fetchShowById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/id/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch show with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching show with ID ${id}:`, error);
    throw error;
  }
};
