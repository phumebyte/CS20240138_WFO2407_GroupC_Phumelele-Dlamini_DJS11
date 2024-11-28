import { useEffect, useState } from "react";
import { fetchPreviews } from "../../services/showsApi";
import "../../assets/styles/genres.css";

const GenreDisplay = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const previews = await fetchPreviews();
        
        // Group shows by genre
        const genreMap = {};
        previews.forEach((show) => {
          show.genres.forEach((genre) => {
            if (!genreMap[genre]) {
              genreMap[genre] = { name: genre, shows: [] };
            }
            genreMap[genre].shows.push(show);
          });
        });

        // Create an array of genres with at least one show image
        const genreList = Object.values(genreMap).map((genre) => ({
          name: genre.name,
          image: genre.shows[0]?.image || null, // Use the first show's image as a preview
        }));

        setGenres(genreList);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="genre-grid">
      {genres.map((genre, index) => (
        <div key={index} className="genre-card">
          {genre.image && (
            <img
              src={genre.image}
              alt={genre.name}
              className="genre-image"
            />
          )}
          <p className="genre-name">{genre.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GenreDisplay;
