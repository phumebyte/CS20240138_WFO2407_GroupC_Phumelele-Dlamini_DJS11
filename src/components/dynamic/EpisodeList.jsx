import { useEffect, useState } from "react";
import { fetchPreviews, fetchGenreById, fetchShowById } from "../../services/showsApi";

const PodcastList = () => {
  const [previews, setPreviews] = useState([]);
  const [genre, setGenre] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPreviews = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const data = await fetchPreviews();
        setPreviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPreviews();
  }, []);

  const loadGenre = async (genreId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGenreById(genreId);
      setGenre(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadShowDetails = async (showId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchShowById(showId);
      setShowDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Podcast Previews</h1>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Previews List */}
      {!loading && !error && (
        <ul>
          {previews.map((preview) => (
            <li key={preview.id}>
              {preview.name}
              {/* Button to Load Genre and Show Details */}
              <button onClick={() => loadGenre(preview.genreId)}>Load Genre</button>
              <button onClick={() => loadShowDetails(preview.id)}>Load Show Details</button>
            </li>
          ))}
        </ul>
      )}

      {/* Genre Details */}
      {genre && (
        <div>
          <h2>Genre Details</h2>
          <p>Name: {genre.name}</p>
          <p>Description: {genre.description}</p>
        </div>
      )}

      {/* Show Details */}
      {showDetails && (
        <div>
          <h2>Show Details</h2>
          <p>Title: {showDetails.title}</p>
          <p>Description: {showDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export default PodcastList;
