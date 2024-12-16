import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPreviews } from "../../services/showsApi";
import "../../assets/styles/genres.css";
import LoadingSpinner from "../shared/LoadingSpinner";

const GENRES = { 
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};

const GenreDisplay = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const previews = await fetchPreviews();

        // Group shows by genre
        const genreMap = {};
        previews.forEach((show) => {
          show.genres.forEach((genreId) => {
            const genreName = GENRES[genreId] || `Unknown Genre (${genreId})`; // Map genre ID to name
            if (!genreMap[genreId]) {
              genreMap[genreId] = { name: genreName, shows: [] };
            }
            genreMap[genreId].shows.push(show);
          });
        });

        // Create an array of genres with their shows' details
        const genreList = Object.values(genreMap).map((genre) => ({
          name: genre.name,
          shows: genre.shows,
        }));

        setGenres(genreList);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleShowClick = (showId) => {
    // Navigate to the show page with the show ID 
    navigate(`/shows/${showId}`);
  };

  return (
    <div className="genre-grid">
      {loading && <LoadingSpinner />}

      {genres.map((genre, index) => (
        <div key={index} className="genre-card">
          <p className="genre-name">{genre.name}</p>
          <div className="genre-images">
            {genre.shows.map((show, showIndex) => (
              <div 
                key={showIndex} 
                className="show-image-container"
                onClick={() => handleShowClick(show.id)} 
              >
                <img
                  src={show.image}
                  alt={show.name}
                  className="show-image"
                />
                <p className="show-name">{show.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GenreDisplay;
